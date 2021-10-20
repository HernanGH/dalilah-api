const bcrypt = require('bcrypt');
const { QueryTypes } = require('sequelize');

const sequelize = require('./conexion');

const saltRounds = 10;

const getUser = async (mail, password) => {
  try {
    const [userEncontrado] = await sequelize.query(
      `SELECT * FROM users WHERE mail = '${mail}';`,
      { type: QueryTypes.SELECT }
    );
    
    if(!userEncontrado) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(password, userEncontrado.password);

    if(!isPasswordCorrect) {
      return null;
    }

    delete userEncontrado.password;

    return userEncontrado;  
  } catch (error) {
    console.error('ERROR: ', error);
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const users = await sequelize.query(`SELECT id, mail, user FROM users;`, { type: QueryTypes.SELECT });
    return users;
  } catch (error) {
    console.error('ERROR: ', error);
    return [];
  }
};

const createUser = async (user) => {
  // validacion: user tiene que tener mail, user y password para ser creado
  if (!(user.mail || user.user || user.password)) {
    return null;
  }

  try {
    // validacion: no existe el mail en la db
    const [yaExisteElUsuario] = await sequelize.query(
      `SELECT * FROM users WHERE mail = '${user.mail}';`,
      { type: QueryTypes.SELECT }
    );
  
    if (yaExisteElUsuario) {
      return null;
    }

    // hasheo de password
    const { password } = user;
    const hash = await bcrypt.hash(password, saltRounds);

    // insert en la db del users y obtenemos el id
    const [userId] = await sequelize.query(
      `INSERT INTO users
      (user, mail, password)
      VALUES
      ('${user.user}', '${user.mail}', '${hash}');`,
      { type: QueryTypes.INSERT }
    );

    // armamos el usuario para devolver con el id, sin la password
    const userSaved = {
      id: userId,
      user: user.user,
      mail: user.mail
    };

    return userSaved;
  } catch (error) {
    console.log('Error: ', error);
  }
};

const getUserById = async (id) => {
  try {
    const [userEncontrado] = await sequelize.query(
      `SELECT id, user, mail FROM users WHERE id = ${id};`,
      { type: QueryTypes.SELECT }
    );
    return userEncontrado || null;
  } catch (error) {
    console.error('ERROR', error);
    return null;
  }
};

const updateUser = async (id, user) => {
  // si no hay user o no password no hay nada que actualizar
  if (!user.user || !user.password) {
    return null;
  }

  try {
    const hash = await bcrypt.hash(user.password, saltRounds);

    await sequelize.query(
      `UPDATE users
      SET user = '${user.user}', password = '${hash}'
      WHERE (id = ${id});`,
      { type: QueryTypes.UPDATE }
    );

    const userSaved = {
      id,
      user: user.user
    };
    return userSaved;
  } catch (error) {
    console.error('ERROR: ', error);
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    await sequelize.query(
      `DELETE FROM users WHERE id = ${id};`,
      { type: QueryTypes.DELETE }
    );
    return id;
  } catch (error) {
    console.error('ERROR', error);
    return null;
  }
};
// const modulos = {
//   getUser: getUser,
//   getAllUsers: getAllUsers
// };

// module.exports = modulos;

// es igual a
module.exports = {
  getUser, getAllUsers, createUser,
  getUserById, updateUser, deleteUser
};
