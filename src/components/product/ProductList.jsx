import React, { useEffect, useState } from 'react';
import ProductService from '../../services/ProductService';
import ProductFilter from './ProductFilter';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
          setFilteredProducts(response.data);
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
    const normalizeText = (text) => 
      text
        .toLowerCase()
        .normalize('NFD') // Descompone los caracteres con tilde
        .replace(/[\u0300-\u036f]/g, ''); // Elimin
  
    const filtered = products.filter((product) =>
      normalizeText(product.name).includes(normalizeText(query))
    );
  
    setFilteredProducts(filtered); // Actualiza la lista filtrada
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (confirmDelete) {
      try {
        await ProductService.deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
        setFilteredProducts(filteredProducts.filter((product) => product.id !== id));
      } catch (error) {
        setError('Ocurrió un error al eliminar el producto');
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <span className="ms-3">Cargando productos...</span>
      </div>
    );
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    let x = 10;
    let y = 10;
    const paperWidth = 90;
    const paperHeight = 40;
    const margin = 0;
    const pageWidth = 210;
    const pageHeight = 297;
    const maxX = pageWidth - margin;
    const maxY = pageHeight - margin;

    filteredProducts.forEach((product, index) => {
      doc.setFontSize(12);
      doc.text(product.name, x, y + 10);
      doc.setFontSize(16);
      doc.text(`$ ${product.salePrice.toFixed(2)}`, x, y + 20);
      doc.setFontSize(10);
      doc.text(`Código: ${product.id}`, x, y + 30);

      doc.rect(x - 5, y, paperWidth, paperHeight);

      x += paperWidth + margin;

      if (x + paperWidth > maxX) {
        x = 10;
        y += paperHeight + margin;
      }

      if (y + paperHeight > maxY) {
        doc.addPage();
        x = 10;
        y = 10;
      }
    });

    doc.save('precios_gondolas_productos.pdf');
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-5 text-primary">Gestión de Productos</h1>
        <p className="lead text-muted">Administra tus productos fácilmente con opciones de búsqueda, edición y eliminación.</p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <ProductFilter onFilter={handleFilter} />
        <button className="btn btn-success" onClick={generatePDF}>
          <i className="bi bi-file-earmark-pdf"></i> Papeles de góndolas
        </button>
      </div>

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio de Venta</th>
            <th>Precio de Costo</th>
            <th>Stock</th>
            <th className="text-center">Acciones</th>
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
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(product.id)}
                >
                  <i className="bi bi-trash"></i> Borrar
                </button>
                <Link to={`/products/edit/${product.id}`} className="btn btn-primary">
                  <i className="bi bi-pencil-square"></i> Editar
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
