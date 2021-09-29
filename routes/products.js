const express = require('express');

const { getAllProducts } = require('../models/products');

const productRouter = express.Router();

productRouter.get('/', (req, res, next) => {
  console.log('user: ', req.user);
  const products = getAllProducts();
  res.send({ message: 'success', data: products });
});

module.exports = productRouter;
