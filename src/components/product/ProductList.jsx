import React, { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import ProductFilter from './ProductFilter';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts();
        if (response.data.length === 0) {
          setError('No se encontraron productos');
        } else {
          setProducts(response.data);
          setFilteredProducts(response.data); // Inicializa los productos filtrados con todos los productos
        }
      } catch (error) {
        setError('Ocurrió un error al obtener los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered); // Actualiza la lista filtrada
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmDelete) {
      try {
        await ProductService.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id)); // Elimina el producto de la lista local
        setFilteredProducts(filteredProducts.filter(product => product.id !== id)); // Elimina el producto de la lista filtrada
      } catch (error) {
        setError('Ocurrió un error al eliminar el producto');
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    
    <div className="container mt-4" >

      {error && <div className="alert alert-danger">{error}</div>}
      
      <ProductFilter onFilter={handleFilter} /> 

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio de Venta</th>
            <th>Precio de Costo</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>$ {product.salePrice}</td>
              <td>$ {product.costPrice}</td>
              <td>{product.stock}</td>
              <td>
                <button type="button" className="btn btn-danger"
                  onClick={()=> handleDelete(product.id)}
                >
                  <i className="bi bi-trash"></i> 
                  Borrar
                </button>

                
                <Link to={`/products/edit/${product.id}`} className="btn btn-primary">
                <i className="bi bi-pencil-square"></i>
                  Editar
                </Link>

              </td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
