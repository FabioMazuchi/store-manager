const productsService = require('../services/productsService');

const getProducts = async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.status(200).json(products);
  } catch (e) {
    console.log('Erro getProducts: ', e.message);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    res.json(product);
  } catch (e) {
    console.log('Erro getById: ', e.message);
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    
    const newProduct = await productsService.create(name, quantity);
    
    res.status(201).json(newProduct);
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
  
    const updateProd = await productsService.update(id, name, quantity);
    res.send(updateProd);
  } catch (e) {
    next(e);
  }
};

const deletar = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    await productsService.deletar(id);
    
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getProducts,
  getById,
  create,
  update,
  deletar,
};