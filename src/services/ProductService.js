import axios from 'axios';

const API_URL = 'http://localhost:8080/api/products';

const getAllProducts = () => axios.get(API_URL);
const getProductById = (id) => axios.get(`${API_URL}/find-id/${id}`);
const getProductByName = (name) => axios.get(`${API_URL}/find-name/${name}`);
const addProduct = (product) => axios.post(API_URL, product);
const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);
const updateProduct = (id, product) => axios.put(`${API_URL}/${id}`, product);

export default {
  getAllProducts,
  getProductById,
  getProductByName,
  addProduct,
  deleteProduct,
  updateProduct,
};
