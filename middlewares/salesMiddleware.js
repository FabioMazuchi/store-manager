const data = {
  productIdBlank: { status: 400, message: '"productId" is required' },
  quantityBlank: { status: 400, message: '"quantity" is required' },
  quantitySmaller: { status: 422, message: '"quantity" must be greater than or equal to 1' },
};

const productIdBlank = (productId) => !productId;
const quantityBlank = (quantity) => !quantity && quantity !== 0;
const quantitySmaller = (quantity) => quantity <= 0;

const verifyData = (productId, quantity) => {
  if (productIdBlank(productId)) throw data.productIdBlank;
  if (quantitySmaller(quantity)) throw data.quantitySmaller;
  if (quantityBlank(quantity)) throw data.quantityBlank;
};

const validate = (req, res, next) => {
  try {
    const { quantity, productId } = req.body[0];
    verifyData(productId, quantity);
    res.send('Ok');
  } catch (e) {
    next(e);
  }
};

module.exports = {
    validate,
};