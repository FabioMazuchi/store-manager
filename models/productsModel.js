const connection = require('./connection');

const getProducts = async () => {
  const [results] = await connection.execute('SELECT * FROM products ORDER BY id');

  return results;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id=?', [id]);

  return product[0];
};

const getByName = async (name) => {
  const query = 'SELECT * FROM products WHERE name=?';

  const [product] = await connection.execute(query, [name]);

  return product;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?,?)';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  const newProduct = { id: insertId, name, quantity };
  
  return newProduct;
};

module.exports = {
  getProducts,
  getById,
  create,
  getByName,
};
