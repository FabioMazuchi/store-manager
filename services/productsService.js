const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const products = await productsModel.getProducts();
  
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  const erro = { status: 404, message: 'Product not found' };

  if (!product) throw erro;

  return product;
};

module.exports = {
  getProducts,
  getById,
};
