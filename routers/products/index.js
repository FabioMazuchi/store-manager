const express = require('express');
const productsController = require('../../controllers/productsController');
const { validate } = require('../../middlewares/productMiddleware');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);
productsRouter.get('/:id', productsController.getById);
productsRouter.post('/', validate, productsController.create);

module.exports = productsRouter;