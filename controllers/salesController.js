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

module.exports = {
  getSales,
  getById,
};