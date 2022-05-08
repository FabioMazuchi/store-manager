const getDateHour = require('../utils/date');
const connection = require('./connection');
const salesProductsModel = require('./salesProductsModel');
const salesModelUtils = require('../utils/salesModelUtils');

const getSales = async () => {
  const query = `SELECT
  sale_id saleId,
  date,
  product_id productId,
  quantity
  FROM sales_products as salProd
  JOIN sales as sal ON
  salProd.sale_id = sal.id`;
  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = `SELECT
  date,
  product_id productId,
  quantity
  FROM sales_products as salProd
  JOIN sales as sal ON
  salProd.sale_id = sal.id
  WHERE sal.id = ?`;
  const [sale] = await connection.execute(query, [
    id,
  ]);

  return sale;
};

const create = async (arraySold) => {
  const date = getDateHour();
  const query = 'INSERT INTO sales (date) VALUES (?)';

  const [{ insertId }] = await connection.execute(query, [date]);

  salesModelUtils.addSoldIdOnObj(arraySold, insertId);

  await arraySold.forEach(salesProductsModel.create);

  salesModelUtils.removeSoldIdOnObj(arraySold);
  
  const newSold = {
    id: insertId,
    itemsSold: arraySold,
  };

  return newSold;
};

module.exports = {
  getSales,
  getById,
  create,
};
