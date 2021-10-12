const { QueryTypes } = require('sequelize');
const sequelize = require('../models/conexion');

const CREATE_PRODUCT_TABLE = `
  CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR(255) NOT NULL ,
    price VARCHAR(255) NOT NULL ,
    PRIMARY KEY (id)
  ) ENGINE = InnoDB;`;

const INSERT_PRODUCT_1 = `
  INSERT INTO products
  (name, price)
  VALUES
  ('hamburguesa', '100');
`;

const INSERT_PRODUCT_2 = `
  INSERT INTO products
  (name, price)
  VALUES
  ('papas fritas', '80');
`;

const createTables = async () => {
  try {
    await sequelize.query(CREATE_PRODUCT_TABLE);
    console.log('TABLA products created successfuly');
  } catch (error) {
    console.error('Error: ', error);
  }
};

const insertData = async () => {
  try {
    await sequelize.query(INSERT_PRODUCT_1, { type: QueryTypes.INSERT });
    await sequelize.query(INSERT_PRODUCT_2, { type: QueryTypes.INSERT });
    console.log('Products inserted successfuly');
  } catch (error) {
    console.error('Error: ', error);
  }
};

const main = async () => {
  await createTables();
  await insertData();
};

main();