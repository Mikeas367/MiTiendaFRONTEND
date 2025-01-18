import React, { useState } from 'react';
import { Alert, Button, Form, Container } from 'react-bootstrap';
import productService from '../../services/ProductService';  // Ajusta la ruta según la ubicación de tu archivo

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    salePrice: '',
    costPrice: '',
    stock: '',
  });
  const [message, setMessage] = useState(null); // Para mostrar el mensaje de éxito
  const [loading, setLoading] = useState(false); // Para controlar el estado de carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Limpiar el mensaje previo

    try {
      const response = await productService.addProduct(product);
      setLoading(false);
      if (response.status === 200) {
        setMessage({ type: 'success', text: 'Producto creado exitosamente!' });
        setProduct({ name: '', salePrice: '', costPrice: '', stock: '' }); // Limpiar el formulario
      } else {
        setMessage({ type: 'danger', text: 'Error al crear el producto. Intenta nuevamente.' });
      }
    } catch (error) {
      setLoading(false);
      setMessage({ type: 'danger', text: 'Error al crear el producto. Intenta nuevamente.' });
    }
  };

  return (
    <Container className="mt-5">
      <h2>Agregar Producto</h2>
      {message && (
        <Alert variant={message.type} className="mt-3">
          {message.text}
        </Alert>
      )}
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group controlId="productName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="salePrice">
          <Form.Label>Precio de venta</Form.Label>
          <Form.Control
            type="number"
            name="salePrice"
            value={product.salePrice}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="costPrice">
          <Form.Label>Precio de costo</Form.Label>
          <Form.Control
            type="number"
            name="costPrice"
            value={product.costPrice}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          disabled={loading}
        >
          {loading ? 'Creando...' : 'Crear Producto'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
