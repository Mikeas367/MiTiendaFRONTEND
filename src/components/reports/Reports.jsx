import React from "react";
import RevenueByProductChart from "./RevenueByProductChart";
import { Link } from 'react-router-dom';
import '../Menu.css'; 

const Reports = () => {
  return (
    <div>
      <h1>Reportes</h1>
      <div className="menu-buttons">
                <Link to={`/top-selling-products`} className="btn menu-btn new-product-btn">
                    <i class="bi bi-clipboard-data-fill">Productos Mas vendidos</i>
                </Link>

                <Link to={`/revenue-by-product`} className="btn menu-btn new-product-btn">
                    <i class="bi bi-clipboard-data-fill">Productos que mas generaron</i>
                </Link>
      </div>
    </div>
  );
};

export default Reports;
