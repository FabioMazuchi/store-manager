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

const create = async (name, quantity) => {
  const product = await productsModel.getByName(name);
  const arrayVazio = { status: 409, message: 'Product already exists' };
  
  if (product.length !== 0) throw arrayVazio;

  const newProduct = await productsModel.create(name, quantity);

  return newProduct;
};

const update = async (id, name, quantity) => {
  await getById(id);
  
  const updateProd = productsModel.update(id, name, quantity);

  return updateProd;
};

const deletar = async (id, arraySold) => {
  await getById(id);
  await productsModel.deletar(id, arraySold);
};

module.exports = {
  getProducts,
  getById,
  create,
  update,
  deletar,
};
