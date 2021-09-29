// mi data base
const users = [
  {
    id: 0,
    user: "codigo",
    password: "1234"
  },
  {
    id: 1,
    user: "acamica",
    password: "acamica"
  }
];

const getUser = (user, password) => {
  const userEncontrado = users
    .find((userItem) => userItem.user === user
      && userItem.password === password);
  
  return userEncontrado;
};

const getAllUser = () => users;

// const modulos = {
//   getUser: getUser,
//   getAllUser: getAllUser
// };

// module.exports = modulos;

// es igual a
module.exports = {
  getUser, getAllUser
};
