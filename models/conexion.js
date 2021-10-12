const Sequelize = require('sequelize');

const path = `mysql://root:rootroot@localhost:3306/resto`;

const sequelize = new Sequelize(path, { operatorsAliases: false });

sequelize.authenticate()
  .then(() => console.log('Conectado a MYSQL'))
  .catch((error) => console.error('Error: ', error));

module.exports = sequelize;


