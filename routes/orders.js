const express = require('express');
const { getAllOrders, getOrderById } = require('../models/orders');

const orderRouter = express.Router();

orderRouter.get('/', async (req, res, next) => {
  const orders = await getAllOrders();

  res.send({
    message: 'success',
    data: orders
  });
});

orderRouter.get('/:id', async (req, res, next) => {
  const orderId = req.params.id;

  const order = await getOrderById(orderId);

  if (order) {
    res.send({ message: 'success', data: order });
  } else {
    res
      .status(404)
      .json({ message: 'order not found'});
  }
});

module.exports = orderRouter;
