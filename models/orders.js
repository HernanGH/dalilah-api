const order_products = [
  {
    id: 0,
    order_id: 0,
    product_id: 0,
    cantidad: 1
  },
  {
    id: 1,
    order_id: 0,
    product_id: 1,
    cantidad: 1
  },
  {
    id: 3,
    order_id: 1,
    product_id: 1,
    cantidad: 2
  }
];

const orders = [
  {
    id: 0,
    user_id: 0,
    total: 100
  },
  {
    id: 1,
    user_id: 0,
    total: 80
  }
];

const getAllOrders = async () => {
  const orderWithProducts = orders.map((order) => {
    return {
      ...order,
      products: order_products.filter((order_productsItem) => order_productsItem.order_id === order.id)
    };
  })

  return orderWithProducts;
};

module.exports = {
  getAllOrders
}