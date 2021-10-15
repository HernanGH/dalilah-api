const { QueryTypes } = require('sequelize');
const sequelize = require('./conexion');

const unifyOrders = (ordersWithProducts) => {
  const ordersUnifiedWithProductList = [];

  ordersWithProducts.forEach((item) => {
    const orderInList = ordersUnifiedWithProductList.find((order) => order.id === item.order_id);

    // order no esta, agregamos la orden y agregamos el 1er product
    if (!orderInList) {
      ordersUnifiedWithProductList.push({
        // datos de la orden
        id: item.order_id,
        total: item.total,
        // datos de los products
        products: [{
          id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }]
      });
    } else {
      // orden si esta, agregamos el product
      orderInList.products.push({
        id: item.product_id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      });
    } 
  });

  return ordersUnifiedWithProductList;
};

const getAllOrders = async () => {
  try {
    const ordersWithProducts = await sequelize.query(
      `SELECT * FROM orders
        INNER JOIN order_product
        ON orders.id = order_product.order_id
        INNER JOIN products
        ON products.id = order_product.product_id;`,
      { type: QueryTypes.SELECT }
    );
    return unifyOrders(ordersWithProducts);
  } catch (error) {
    console.log('Error: ', error);
    return []; 
  }
};

const getOrderById = async (id) => {
  try {
    const ordersWithProducts = await sequelize.query(
      `SELECT * FROM orders
        INNER JOIN order_product
        ON orders.id = order_product.order_id
        INNER JOIN products
        ON products.id = order_product.product_id
        WHERE orders.id = ${id}`,
      { type: QueryTypes.SELECT }
    );

    const order = unifyOrders(ordersWithProducts)[0];

    if (!order) {
      return null;
    }

    return order;
  } catch (error) {
    
  }
};

module.exports = {
  getAllOrders, getOrderById
}