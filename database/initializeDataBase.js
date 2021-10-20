require('dotenv').config();
const { QueryTypes } = require('sequelize');
const sequelize = require('../models/conexion');

const CREATE_PRODUCT_TABLE = `
  CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR(255) NOT NULL ,
    price VARCHAR(255) NOT NULL ,
    PRIMARY KEY (id)
  ) ENGINE = InnoDB;`;

const CREATE_USER_TABLE = `
  CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    mail VARCHAR(45) NOT NULL,
    user VARCHAR(45) NOT NULL,
    admin TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (id));
`;

const CREATE_ORDER_TABLE = `
  CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    total VARCHAR(45) NULL,
    status VARCHAR(45) NULL,
    PRIMARY KEY (id),
    INDEX user_id_idx (user_id ASC) VISIBLE,
    CONSTRAINT user_id
      FOREIGN KEY (user_id)
      REFERENCES users (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);
`;

const CREATE_ORDER_PRODUCT_TABLE = `
  CREATE TABLE order_product (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NULL,
    PRIMARY KEY (id),
    INDEX order_id_idx (order_id ASC) VISIBLE,
    INDEX product_id_idx (product_id ASC) VISIBLE,
    CONSTRAINT order_id
      FOREIGN KEY (order_id)
      REFERENCES orders (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
    CONSTRAINT product_id
      FOREIGN KEY (product_id)
      REFERENCES products (id)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION);
`;

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

// password: 1234
const INSERT_USER_1 = `
  INSERT INTO users
  (password, mail, user)
  VALUES
  ('$2b$10$sRQmBqExMXxoXbSFVB.9BuHC7efpmKram9l1E4l7cnvOjQ5lc2w3u', 'user@mail.com', 'user');
`;

// password: acamica
const INSERT_USER_2 = `
  INSERT INTO users
  (password, mail, user, admin)
  VALUES
  ('$2b$10$/HJ9SfJ3HgsTEcqBnwBm2OdGXsTplyFxIE34QO2jRhRQR4x0BSkzi', 'admin@mail.com', 'admin', 1);
`;

const DROP_USER_TABLE = `DROP TABLE IF EXISTS users;`
const DROP_PRODUCT_TABLE = `DROP TABLE IF EXISTS products;`
const DROP_ORDER_TABLE = `DROP TABLE IF EXISTS orders;`
const DROP_ORDER_PRODUCT_TABLE = `DROP TABLE IF EXISTS order_product;`

const createTables = async () => {
  try {
    await sequelize.query(CREATE_PRODUCT_TABLE);
    await sequelize.query(CREATE_USER_TABLE);
    await sequelize.query(CREATE_ORDER_TABLE);
    await sequelize.query(CREATE_ORDER_PRODUCT_TABLE);
    console.log('tables products, users, orders and order_product created successfuly');
  } catch (error) {
    console.error('Error: ', error);
  }
};

const insertData = async () => {
  try {
    await sequelize.query(INSERT_PRODUCT_1, { type: QueryTypes.INSERT });
    await sequelize.query(INSERT_PRODUCT_2, { type: QueryTypes.INSERT });
    await sequelize.query(INSERT_USER_1, { type: QueryTypes.INSERT });
    await sequelize.query(INSERT_USER_2, { type: QueryTypes.INSERT });
    console.log('Products and Users inserted successfuly');
  } catch (error) {
    console.error('Error: ', error);
  }
};

const deleteTables = async () => {
  try {
    await sequelize.query(DROP_ORDER_PRODUCT_TABLE);
    await sequelize.query(DROP_ORDER_TABLE);
    await sequelize.query(DROP_USER_TABLE);
    await sequelize.query(DROP_PRODUCT_TABLE);
    console.log('tables products, users, orders and order_product deleted successfuly');
  } catch (error) {
    console.error('Error: ', error);
  }
};

const main = async () => {
  await deleteTables();
  await createTables();
  await insertData();
};

main();