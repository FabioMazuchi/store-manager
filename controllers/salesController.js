const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  const sales = await salesService.getSales();
  res.json(sales);
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    res.status(200).json(sale);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res) => {
    const sale = req.body;
  
    const newSold = await salesService.create(sale);
    res.status(201).json(newSold);
};

const update = async (req, res) => {
  const { id } = req.params;
  const arraySold = req.body;

  const soldUpdated = await salesService.update(id, arraySold);
  
  res.status(200).json(soldUpdated);
};

const deletar = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    await salesService.deletar(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getSales,
  getById,
  create,
  update,
  deletar,
};