const express = require('express');
const { getAllOrders } = require('../models/orders');

const orderRouter = express.Router();

orderRouter.get('/', async (req, res, next) => {
  const orders = await getAllOrders();

  res.send({
    message: 'success',
    data: orders
  })
});

module.exports = orderRouter;
