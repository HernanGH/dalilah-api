const express = require('express');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config');
const { getUser, createUser } = require('../models/users');

const userRouter = express.Router();

userRouter.post('/login', (request, response, next) => {
  console.log(request.body);
  const user = getUser(request.body.mail, request.body.password);
  
  // si el usuario existe
  if(user) {
    const token = jwt.sign(user, SECRET);

    response.send({ message: 'login success and token', token });
  } else {
    response.status(403).send({ message: 'user or password wrong'});
  }
});

userRouter.post('/sign-up', async (request, response, next) => {
  console.log(request.body);
  const newUser = request.body;
  const userSaved = await createUser(newUser);

  if (userSaved) {
    response.send({ message: 'sign up success', data: userSaved });
  } else {
    response.status(404).json({ message: 'sign up wrongt'});
  }
});


module.exports = userRouter;