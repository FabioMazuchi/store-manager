const connection = require('./connection');

const create = async ({ soldId, productId, quantity }) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)';

  await connection.execute(query, [soldId, productId, quantity]);
};

module.exports = {
  create,
};