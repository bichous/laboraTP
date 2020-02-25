const router = require('express').Router();
const {
  allOrders,
  createOrder,
  ordersByUser
} = require('../controllers/orderControllers');

router.get('/allOrders', allOrders);

router.get('/allOrders/byUser', ordersByUser);

router.post('/createOrder', createOrder);

module.exports = router;
