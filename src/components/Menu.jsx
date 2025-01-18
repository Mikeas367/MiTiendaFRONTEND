import { Link } from 'react-router-dom';
import './Menu.css'; // Archivo de estilos para este componente

const Menu = () => {
    return (
        <div className="menu-container">
            <h1 className="menu-title">¡Bienvenido al Panel de Gestión!</h1>
            <div className="menu-buttons">
                <Link to={`/new-product`} className="btn menu-btn new-product-btn">
                    <i className="bi bi-plus-circle-fill"> Nuevo Producto </i>
                </Link>

                <Link to={`/sale`} className="btn menu-btn sale-btn">
                    <i className="bi bi-basket-fill"> Nueva Venta </i>
                </Link>

                <Link to={`/products`} className="btn menu-btn products-btn">
                    <i className="bi bi-box-seam-fill"> Productos </i>
                </Link>
                
            </div>
        </div>
    );
};

export default Menu;
