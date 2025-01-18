import React, { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom'; 

const ProductEdit = () => {
  const { id } = useParams(); //  ID del producto desde la URL
  const navigate = useNavigate(); 
  const [product, setProduct] = useState({
    name: '',
    salePrice: 0,
    costPrice: 0,
    stock: 0
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getProductById(id);
        setProduct(response.data);
      } catch (error) {
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: product.name,
      salePrice: parseFloat(product.salePrice),
      costPrice: parseFloat(product.costPrice),
      stock: parseInt(product.stock)
    };
    console.log("Datos que envio: ", updatedProduct)
    try {
      await ProductService.updateProduct(id, updatedProduct);
      navigate('/products'); // Redirige a la lista de productos
    } catch (error) {
      setError('Ocurrió un error al actualizar el producto');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <h3>Editar Producto</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salePrice">Precio de Venta</label>
          <input
            type="number"
            className="form-control"
            id="salePrice"
            name="salePrice"
            value={product.salePrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="costPrice">Precio de Costo</label>
          <input
            type="number"
            className="form-control"
            id="costPrice"
            name="costPrice"
            value={product.costPrice}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
