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

const getMyOrders = async (userId) => {
  try {
    const ordersWithProducts = await sequelize.query(
      `SELECT * FROM orders
        INNER JOIN order_product
        ON orders.id = order_product.order_id
        INNER JOIN products
        ON products.id = order_product.product_id
        WHERE order.user_id = ${userId};`,
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

const createOrder = async (order) => {
  // si la order tiene total, status y products
  if(order.total && order.status && order.products.length > 0) {
    try {
      const [orderId] = await sequelize.query(
        `INSERT INTO orders
        (total, status, user_id)
        VALUES
        ('${order.total}', '${order.status}', ${order.userId});`,
        { type: QueryTypes.INSERT }
      );
      
      const values = order.products.map((productItem) => {
        return `('${orderId}', '${productItem.id}', ${productItem.quantity})`;
      }).join(',');

      const [orderProductId] = await sequelize.query(
        `INSERT INTO order_product
        (order_id, product_id, quantity)
        VALUES
        ${values};`,
        { type: QueryTypes.INSERT }
      );

      const orderSaved = {
        id: orderId,
        ...order
      };
      return orderSaved;
    } catch (error) {
      console.error('ERROR: ', error);
      return null;
    }
  } else {
    return null;
  }
};

const updateOrder = async (id, order) => {
  // si no hay status o no total no hay nada que actualizar
  if (!order.status || !order.total) {
    return null;
  }

  try {
    await sequelize.query(
      `UPDATE orders
      SET status = '${order.status}', total = '${order.total}'
      WHERE (id = ${id});`,
      { type: QueryTypes.UPDATE }
    );

    const orderSaved = {
      id,
      ...order
    };
    return orderSaved;
  } catch (error) {
    console.error('ERROR: ', error);
    return null;
  }
};

module.exports = {
  getAllOrders, getOrderById, getMyOrders,
  createOrder, updateOrder
}