// mi data base
const products = [
  {
    id: 0,
    name: "hamburguesa",
    price: 100
  },
  {
    id: 1,
    name: "papas fritas",
    price: 80
  }
];

const getProduct = (id) => {
  const productEncontrado = products
    .find((productoItem) => productoItem.id === id);
  
  return productEncontrado;
};

const getAllProducts = () => products;

const createProduct = (product) => {
  // si el producto tiene name y price
  if(product.name && product.price) {
    const lastId = products[products.length - 1].id;
    
    const productWithId = {
      id: lastId + 1,
      ...product
    };
    products.push(productWithId);
    return productWithId;
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

const deleteProduct = (id) => {
  const productDeleted = products.splice(id, 1);
  if (productDeleted.length === 0) {
    return null;
  } else {
    return productDeleted[0];
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
  updateProduct
};
