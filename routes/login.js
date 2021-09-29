const express = require('express');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const { getUser } = require('../models/users');

const loginRouter = express.Router();

loginRouter.post('/', (request, response, next) => {
  console.log(request.body);
  const user = getUser(request.body.user, request.body.password);
  
  // si el usuario existe
  if(user) {
    const token = jwt.sign(user, SECRET);

    response.send({ message: 'login success and token', token });
  } else {
    response.status(403).send({ message: 'user or password wrong'});
  }
});

module.exports = loginRouter;