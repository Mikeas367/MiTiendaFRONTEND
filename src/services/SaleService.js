import axios from 'axios';

const API_URL = 'http://localhost:8080/api/sales';

const createSale = (saleDetails) => axios.post(API_URL, { details: saleDetails });
const getAllSales = () => axios.get(API_URL);
const getTopSellingProducts = () => axios.get(`${API_URL}/reports/top-selling-products`);
const getRevenueByProduct = () => axios.get(`${API_URL}/reports/revenue-by-product`);
  

export default {
  createSale,
  getAllSales,
  getTopSellingProducts,
  getRevenueByProduct,

  
};