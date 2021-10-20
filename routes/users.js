const express = require('express');
const {
  createUser, getAllUsers,
  getUserById, deleteUser, updateUser
} = require('../models/users');


const userRouter = express.Router();

userRouter.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  res.send({ message: 'success', data: users });
});

userRouter.get('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const user = await getUserById(id);

  if (user) {
    res.send({ message: 'success', data: user });
  } else {
    res
      .status(404)
      .json({ message: 'user not found'});
  }
});

userRouter.post('/', async (req, res, next) => {
  const newUser = req.body;
  const userSaved = await createUser(newUser);

  if (userSaved) {
    res.send({
      message: 'user created successfuly',
      data: userSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'user creation wrongt'});
  }
});

userRouter.put('/:id', async (req, res, next) => {
  const userUpdate = req.body;
  const userId = parseInt(req.params.id);

  const userSaved = await updateUser(userId, userUpdate);
  
  if(userSaved) {
    res.send({
      message: 'user updated successfuly',
      data: userSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'user update wrongt'});
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);

  const userIdDeleted = await deleteUser(id);

  if (userIdDeleted) {
    res.send({
      message: 'user delete successfuly',
      data: {
        id: userIdDeleted
      }
    });
  } else {
    res
      .status(404)
      .json({ message: 'user delete wrongt'});
  }
});

module.exports = userRouter;
