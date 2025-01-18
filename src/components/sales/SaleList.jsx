import React, { useState, useEffect } from 'react';
import saleService from '../../services/SaleService'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const SalesListComponent = () => {
  const [sales, setSales] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    saleService.getAllSales()
      .then(response => {
        if (Array.isArray(response.data)) {
          setSales(response.data);
        } else {
          setError("Datos no válidos recibidos del servidor.");
        }
      })
      .catch(error => setError("Error al cargar las ventas."));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Listado de Ventas</h1>

      {/* Mostrar mensaje de error */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      {sales.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID Venta</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Fecha - Hora</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>
                  {sale.details.map((detail, index) => (
                    <div key={index}>
                      {detail.productName} - {detail.quantity} x ${detail.productPrice.toFixed(2)}
                    </div>
                  ))}
                </td>
                <td>
                  ${sale.details.reduce((total, detail) => total + (detail.quantity * detail.productPrice), 0).toFixed(2)}
                </td>
                <td>{new Date(sale.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesListComponent;
