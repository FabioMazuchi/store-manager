const salesModel = require('../models/salesModel');

const getSales = async () => {
  const sales = await salesModel.getSales();

  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  const erro = { status: 404, message: 'Sale not found' };

  if (sale.length === 0) throw erro;

  return sale;
};

const create = async (arraySold) => {
  const newSold = await salesModel.create(arraySold);

  return newSold;
};

module.exports = {
  getSales,
  getById,
  create,
};
