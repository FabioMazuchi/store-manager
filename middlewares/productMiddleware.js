const data = {
  nameBlank: { status: 400, message: '"name" is required' },
  nameLenght: { status: 422, message: '"name" length must be at least 5 characters long' },
  quantityBlank: { status: 400, message: '"quantity" is required' },
  quantitySmaller: { status: 422, message: '"quantity" must be greater than or equal to 1' },
};

const nameBlank = (name) => !name;
const nameLenght = (name) => name.length < 5;
const quantitySmaller = (quantity) => quantity <= 0;
const quantityBlank = (quantity) => !quantity && quantity !== 0;

const verifyData = (name, quantity) => {
  if (nameBlank(name)) throw data.nameBlank;
  if (nameLenght(name)) throw data.nameLenght;
  if (quantitySmaller(quantity)) throw data.quantitySmaller;
  if (quantityBlank(quantity)) throw data.quantityBlank;
};

const validate = (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    verifyData(name, quantity);

    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  validate,
};