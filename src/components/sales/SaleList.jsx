import React, { useState, useEffect } from "react";
import saleService from "../../services/SaleService";
import "bootstrap/dist/css/bootstrap.min.css";

import "./SaleList.css";

const SalesListComponent = () => {
  const [sales, setSales] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // Para filtrar ventas por ID

  useEffect(() => {
    saleService
      .getAllSales()
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSales(response.data);
        } else {
          setError("Datos no válidos recibidos del servidor.");
        }
      })
      .catch((error) => setError("Error al cargar las ventas."));
  }, []);

  const filteredSales = sales.filter((sale) =>
    sale.id.toString().includes(search)
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Listado de Ventas</h1>

      {/* Campo de búsqueda */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por ID de venta"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Mostrar mensaje de error */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          ></button>
        </div>
      )}

      {/* Mostrar ventas */}
      {filteredSales.length === 0 ? (
        <p className="text-center">No hay ventas registradas o no coinciden con la búsqueda.</p>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID Venta</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Fecha - Hora</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>
                  {sale.details.map((detail, index) => (
                    <div key={index}>
                      {detail.productName}: {detail.quantity} x $
                      {detail.productPrice.toFixed(2)}
                    </div>
                  ))}
                </td>
                <td>
                  ${sale.details
                    .reduce(
                      (total, detail) =>
                        total + detail.quantity * detail.productPrice,
                      0
                    )
                    .toFixed(2)}
                </td>
                <td>{new Date(sale.date).toLocaleString("es-ES")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesListComponent;
