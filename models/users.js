const bcrypt = require('bcrypt');
const saltRounds = 10;

// mi data base
const users = [
  {
    id: 0,
    user: "codigo",
    password: "$2b$10$sRQmBqExMXxoXbSFVB.9BuHC7efpmKram9l1E4l7cnvOjQ5lc2w3u", // 1234
    mail: "codigo@mail.com"
  },
  {
    id: 1,
    user: "acamica",
    password: "$2b$10$/HJ9SfJ3HgsTEcqBnwBm2OdGXsTplyFxIE34QO2jRhRQR4x0BSkzi", // acamica
    mail: "acamica@mail.com"
  }
];

const getUser = async (mail, password) => {
  const userEncontrado = users
    .find((userItem) => userItem.mail === mail);
  
  if(!userEncontrado) {
    return null
  }

  const result = await bcrypt.compare(password, userEncontrado.password);

  if(!result) {
    return null
  }

  delete userEncontrado.password;

  return userEncontrado;
};

const getAllUser = () => users;

const createUser = async (user) => {
  if (!(user.mail || user.user || user.password)) {
    return null;
  }

  const yaExisteElUsuario = users
    .some((userItem) => userItem.mail === user.mail);
  
  if (yaExisteElUsuario) {
    return null;
  }

  const lastId = users[users.length - 1].id;

  const { password } = user;
  const hash = await bcrypt.hash(password, saltRounds);

  const newUser = {
    ...user, // spread operator
    id: lastId + 1
  };
  delete newUser.password;

  users.push({
    ...newUser,
    password: hash
  });
  return newUser;
};

// const modulos = {
//   getUser: getUser,
//   getAllUser: getAllUser
// };

// module.exports = modulos;

// es igual a
module.exports = {
  getUser, getAllUser, createUser
};
