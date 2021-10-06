const express = require('express');

const {
  getAllProducts, createProduct, updateProduct,
  deleteProduct, getProduct
} = require('../models/products');

const productRouter = express.Router();

productRouter.get('/', (req, res, next) => {
  const products = getAllProducts();
  res.send({ message: 'success', data: products });
});

productRouter.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = getProduct(id);

  if (product) {
    res.send({ message: 'success', data: product });
  } else {
    res
      .status(404)
      .json({ message: 'product not found'});
  }
});

productRouter.post('/', async (req, res, next) => {
  const newProduct = req.body;
  const productSaved = await createProduct(newProduct);

  if (productSaved) {
    res.send({
      message: 'product created successfuly',
      data: productSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'product creation wrongt'});
  }
});

productRouter.put('/:id', async (req, res, next) => {
  const productUpdate = req.body;
  const productId = parseInt(req.params.id);

  const productSaved = await updateProduct(productId, productUpdate, true);
  
  if(productSaved) {
    res.send({
      message: 'product updated successfuly',
      data: productSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'product update wrongt'});
  }
});

productRouter.patch('/:id', async (req, res, next) => {
  const productUpdate = req.body;
  const productId = parseInt(req.params.id);

  const productSaved = await updateProduct(productId, productUpdate, false);
  
  if(productSaved) {
    res.send({
      message: 'product updated successfuly',
      data: productSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'product update wrongt'});
  }
});

productRouter.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);

  const productDeleted = deleteProduct(id);

  if (productDeleted) {
    res.send({
      message: 'product delete successfuly',
      data: productDeleted
    });
  } else {
    res
      .status(404)
      .json({ message: 'product delete wrongt'});
  }
});

module.exports = productRouter;
