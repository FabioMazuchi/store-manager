const express = require('express');
const salesController = require('../../controllers/salesController');
const { validate } = require('../../middlewares/salesMiddleware');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getSales);
salesRouter.get('/:id', salesController.getById);
salesRouter.post('/', validate, salesController.create);
salesRouter.put('/:id', validate, salesController.update);
salesRouter.delete('/:id', salesController.deletar);

module.exports = salesRouter;