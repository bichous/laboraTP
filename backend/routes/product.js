const router = require('express').Router();
const {
  allProducts,
  createProduct
} = require('../controllers/productController');

router.get('/allProducts', allProducts);

router.post('/create', createProduct);

module.exports = router;
