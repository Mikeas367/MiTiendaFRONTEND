
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import ProductController from './controllers/ProductController';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Menu from './components/Menu';

import AddProduct from './components/product/AddProduct';
import ProductEdit from './components/product/ProductEdit';

import PurchaseComponent from './components/sales/PurchaseComponent';
import SalesList from './components/sales/SaleList';

import Reports from './components/reports/Reports';
import TopSellingProductsChart from './components/reports/TopSellingProductsChart';
import RevenueByProductChart from './components/reports/RevenueByProductChart';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu></Menu>} />
        <Route path="/products" element={<ProductController />} />
        <Route path="/new-product" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<ProductEdit/>} />
        <Route path="/sale" element={<PurchaseComponent></PurchaseComponent>} />
        <Route path="/sales" element={<SalesList/>} />
        <Route path="/reports" element={<Reports></Reports>} />
        <Route path="/top-selling-products" element={<TopSellingProductsChart></TopSellingProductsChart>} />
        <Route path="/revenue-by-product" element={<RevenueByProductChart />} />
        <Route path="/about" element={<h1>Acerca de</h1>} />
      
      </Routes>
    </Router>
  );
};

export default App;
