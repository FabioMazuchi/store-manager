const connection = require('./connection');

const create = async ({ soldId, productId, quantity }) => {
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?)';

  await connection.execute(query, [soldId, productId, quantity]);
};

const deletar = async (id) => {
  const query = 'DELETE FROM sales_products WHERE sale_id=?';

  await connection.execute(query, [id]);
};

module.exports = {
  create,
  deletar,
};