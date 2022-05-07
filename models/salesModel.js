const connection = require('./connection');

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

module.exports = {
  getSales,
  getById,
};
