const salesProductsModel = require('../models/sales_productsModel');

const verifyQtdProduct = async (arraySold) => {
  const arr = [];
  arraySold.forEach(({ productId }) => {
    const res = salesProductsModel.getLastQuantity(productId);
    arr.push(res);
  });

  const [result] = await Promise.all(arr);

  let verify = false;

  result.forEach(({ quantity }, i) => {
    console.log(quantity);
    console.log(arraySold[i].quantity);

    if (quantity - arraySold[i].quantity < 0) return verify;
    verify = true;
  });

  return verify;
};

module.exports = {
  verifyQtdProduct,
};
