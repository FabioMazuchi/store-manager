const connection = require('./connection');

const getProducts = async () => {
  const [results] = await connection.execute('SELECT * FROM products ORDER BY id');

  return results;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id=?', [id]);

  return product[0];
};

module.exports = {
  getProducts,
  getById,
};
