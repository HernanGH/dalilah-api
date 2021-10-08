const { QueryTypes } = require('sequelize');
const sequelize = require('./conexion');

const getProduct = async (id) => {
  try {
    const [productEncontrado] = await sequelize.query(
      `SELECT * FROM products WHERE id = ${id};`,
      { type: QueryTypes.SELECT }
    );
    return productEncontrado || null;
  } catch (error) {
    console.error('ERROR');
    return null;
  }
};

const getAllProducts = async () => {
  try {
    const products = await sequelize.query(`SELECT * FROM products;`, { type: QueryTypes.SELECT });
    return products;
  } catch (error) {
    console.error('ERROR');
    return [];
  }
};

const createProduct = async (product) => {
  // si el producto tiene name y price
  if(product.name && product.price) {
    try {
      const [productId] = await sequelize.query(
        `INSERT INTO products
        (name, price)
        VALUES
        ('${product.name}', '${product.price}');`,
        { type: QueryTypes.INSERT }
      );
      const productSaved = {
        id: productId,
        ...product
      };
      return productSaved;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
  } else {
    return null;
  }
};

const updateProduct = (id, product, overWrite = false) => {
  // si no hay name ni price no hay nada que actualizar
  if (!product.name && !product.price) {
    return null;
  }

  const productEncontrado = getProduct(id);
  if (productEncontrado) {
    let productUpdated = {}

    // si overWrite es true, tenemos sobrescribir todo
    if (overWrite) {
      // PUT: pisa con lo que envio el usuario y borra lo que estaba guardado
      productUpdated = {
        id,
        ...product
      };
    } else {
      // PATCH solo actualiza lo que envio el usuario, no borra lo guardado
      // si overWrite es false no tenemos sobreescribir lo guardado 
      // creamos un objeto con los datos guardatos y los pisamos con los datos nuevos
      productUpdated = {
        ...productEncontrado,
        ...product // spread operator pisa los atributos de productEncontrado con los de product
      };
    }

    const productIndex = products.findIndex(item => item.id === id);
    products.splice(productIndex, 1, productUpdated);
    return productUpdated;
  } else {
    return null;
  }
};

const deleteProduct = async (id) => {
  try {
    await sequelize.query(
      `DELETE FROM products WHERE id = ${id};`,
      { type: QueryTypes.DELETE }
    );
    return id;
  } catch (error) {
    console.error('ERROR');
    return null;
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct
};
