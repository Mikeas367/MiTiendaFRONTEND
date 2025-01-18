import React, { useState, useEffect } from "react";
import productService from "../../services/ProductService"; 
import saleService from "../../services/SaleService"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const PurchaseComponent = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null); 
  const [messageType, setMessageType] = useState(""); 

  useEffect(() => {
    productService.getAllProducts()
      .then(response => setProducts(response.data))
      .catch(error => {
        setMessage("Error al cargar los productos.");
        setMessageType("error");
      });
  }, []);

  const handleAddToCart = () => {
    if (!selectedProduct || quantity <= 0) {
      setMessage("Seleccione un producto y una cantidad válida.");
      setMessageType("error");
      return;
    }

    const existingProduct = cart.find(item => item.product.id === selectedProduct.id);

    if (existingProduct) {
      setCart(cart.map(item =>
        item.product.id === selectedProduct.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { product: selectedProduct, quantity }]);
    }

    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));

  };

  const handleSubmit = () => {
    const saleDetails = cart.map(item => ({
      product: { id: item.product.id },
      quantity: item.quantity,
    }));

    saleService.createSale(saleDetails)
      .then(response => {
        setMessage("Compra realizada con éxito.");
        setMessageType("success");
        setCart([]);
      })
      .catch(error => {
        setMessage("Error al realizar la compra. Intente nuevamente.");
        setMessageType("error");
      });
  };


  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.quantity * item.product.salePrice), 0).toFixed(2);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Realizar Compra</h1>

      {message && (
        <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"} alert-dismissible fade show`} role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setMessage(null)}></button>
        </div>
      )}

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
                  setSelectedProduct(products.find(p => p.id === parseInt(e.target.value)))
                }
              >
                <option value="" disabled>Seleccione un producto</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.salePrice} (Stock: {product.stock})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="quantityInput" className="form-label">Cantidad</label>
              <input
                id="quantityInput"
                type="number"
                className="form-control"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button className="btn btn-primary w-100" onClick={handleAddToCart}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Productos Seleccionados</h5>
          {cart.length === 0 ? (
            <p>No hay productos seleccionados</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
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

      {/* Mostrar Total */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Total de la Compra</h5>
          <p className="h4">${calculateTotal()}</p>
        </div>
      </div>

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
