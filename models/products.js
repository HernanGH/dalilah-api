// mi data base
const products = [
  {
    id: 0,
    name: "hamburguesa",
    price: 100
  },
  {
    id: 1,
    user: "papas fritas",
    price: 80
  }
];

const getProduct = (id) => {
  const productEncontrado = products
    .find((productoItem) => productoItem.id === id);
  
  return productEncontrado;
};

const getAllProducts = () => products;

module.exports = {
  getProduct, getAllProducts
};
