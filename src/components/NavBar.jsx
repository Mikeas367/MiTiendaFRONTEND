import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">My App</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sales">Ventas</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/sale">Nueva Venta</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">Productos</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/new-product">Añadir Producto</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/reports">Reportes</Link>
            </li>
            

            

            <li className="nav-item">
              <Link className="nav-link" to="/about">Acerca de</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
