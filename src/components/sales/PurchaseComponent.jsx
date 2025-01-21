import React, { useState, useEffect } from "react";
import productService from "../../services/ProductService";
import saleService from "../../services/SaleService";
import "bootstrap/dist/css/bootstrap.min.css";

const PurchaseComponent = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    productService
      .getAllProducts()
      .then((response) => setProducts(response.data))
      .catch(() => {
        setMessage("Error al cargar los productos.");
        setMessageType("error");
      });
  }, []);

  const handleAddToCart = () => {
    if (!selectedProduct || quantity <= 0 || quantity > selectedProduct.stock) {
      setMessage("Seleccione un producto válido y asegúrese de que la cantidad no exceda el stock disponible.");
      setMessageType("error");
      return;
    }

    const existingProduct = cart.find((item) => item.product.id === selectedProduct.id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.product.id === selectedProduct.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { product: selectedProduct, quantity }]);
    }

    setSelectedProduct(null);
    setQuantity(1);
    setMessage("Producto agregado al carrito.");
    setMessageType("success");
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  const handleSubmit = () => {
    const saleDetails = cart.map((item) => ({
      productName: item.product.name,
      productPrice: item.product.salePrice,
      quantity: item.quantity,
    }));

    saleService
      .createSale(saleDetails)
      .then(() => {
        setMessage("Compra realizada con éxito.");
        setMessageType("success");
        setCart([]);
      })
      .catch(() => {
        setMessage("Error al realizar la compra. Intente nuevamente.");
        setMessageType("error");
      });
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.quantity * item.product.salePrice, 0).toFixed(2);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Realizar Compra</h1>

      {/* Mensaje de feedback */}
      {message && (
        <div
          className={`alert ${
            messageType === "success" ? "alert-success" : "alert-danger"
          } alert-dismissible fade show`}
          role="alert"
        >
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

      {/* Selección de producto */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Seleccionar Producto</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="productSelect" className="form-label">Producto</label>
              <select
                id="productSelect"
                className="form-select"
                value={selectedProduct?.id || ""}
                onChange={(e) =>
                  setSelectedProduct(products.find((p) => p.id === parseInt(e.target.value)))
                }
              >
                <option value="" disabled>
                  Seleccione un producto
                </option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.salePrice} (Stock: {product.stock})
                  </option>
                ))}
              </select>
              {selectedProduct && (
                <small className="text-muted">Stock disponible: {selectedProduct.stock}</small>
              )}
            </div>
            <div className="col-md-4">
              <label htmlFor="quantityInput" className="form-label">Cantidad</label>
              <input
                id="quantityInput"
                type="number"
                className="form-control"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={handleAddToCart}
                disabled={!selectedProduct || quantity <= 0}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carrito */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Productos Seleccionados</h5>
          {cart.length === 0 ? (
            <p>No hay productos seleccionados.</p>
          ) : (
            <table className="table table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.quantity * item.product.salePrice).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveFromCart(item.product.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Total de la Compra</h5>
          <p className="h4">${calculateTotal()}</p>
        </div>
      </div>

      {/* Botón de Confirmar */}
      <div className="text-end">
        <button
          className="btn btn-success"
          onClick={handleSubmit}
          disabled={cart.length === 0}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default PurchaseComponent;
