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

const update = async (id, arraySold) => {
  const soldUpdated = await salesModel.update(id, arraySold);

  return soldUpdated;
};

const deletar = async (id) => {
  const erro = { status: 404, message: 'Sale not found' };
  const sale = await salesModel.getById(id);

  if (sale.length === 0) throw erro;

  await salesModel.deletar(id);
};

module.exports = {
  getSales,
  getById,
  create,
  update,
  deletar,
};
