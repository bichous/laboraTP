import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://laboratoria-pt.herokuapp.com')
  : (baseURL = 'http://localhost:3000');

const MY_SERVICE = axios.create({ withCredentials: true, baseURL });

const PRODUCT_SERVICE = {
  allProducts: async () => {
    return await MY_SERVICE.get('/product/allProducts');
  },
  createProduct: async product => {
    return await MY_SERVICE.post('/product/create', product);
  }
};

export default PRODUCT_SERVICE;
