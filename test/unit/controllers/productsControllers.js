const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Camada do "controller" a função "getProducts"', () => {
	describe('quando não existem produtos no BD', () => {
		const req = {};
		const res = {};

		before(() => {
			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(productsService, 'getProducts').resolves([]);
		})

		after(() => {
			productsService.getProducts.restore();
		});


		it('é retornado o método "status" com o código 200', async () => {
			await productsController.getProducts(req, res);

			expect(res.status.calledWith(200)).to.be.equal(true);
		});


		it('é retornado o método "json" contendo um array', async () => {
			await productsController.getProducts(req, res);

			expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
		})
	});
});

describe('Camada do "controller" a função "create"', () => {
	describe('quando o produto é cadastrado no BD', () => {
		const req = {};
		const res = {};
		
		const fakeProduct = {
			id: 2,
			name: 'Bicicleta',
			quantity: 7
		};

		before(() => {
			req.body = {
			  id: 2,
			  name: 'Bicicleta',
			  quantity: 7
			}

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(productsService, 'create').resolves(fakeProduct);
		});

		after(() => {
			productsService.create.restore();
		})


		it('é retornado o status 201', async () => {
			await productsController.create(req, res);

			expect(res.status.calledWith(201)).to.be.equal(true);
		});

		it('é retornado o método "json" contendo um array', async () => {
			await productsController.create(req, res);

			expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
		})
	});
});

describe('Camada do "controller" a função "getById"', () => {
	describe('quando não existe produto cadastrado no BD', () => {
		const req = {};
		const res = {};
		
		const fakeProduct = {
			id: 2,
			name: 'Bicicleta',
			quantity: 7
		};

		before(() => {
			req.params = {
        id: 2
      };

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(productsService, 'getById').resolves(fakeProduct);
		});

		after(() => {
			productsService.getById.restore();
		})


		it('é retornado o status 200', async () => {
			await productsController.getById(req, res);

			expect(res.status.calledWith(200)).to.be.equal(true);
		});

		it('é retornado o método "json" contendo um array', async () => {
			await productsController.getById(req, res);

			expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
		})
	});

	describe('quando existe produto cadastrado no BD', () => {
		const req = {};
		const res = {};
		const next = () => {};
		
		const fakeStatus = {
			status: 404,
			message: 'Product not found',
		};

		before(() => {
			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(productsService, 'getById').resolves(fakeStatus);
		});

		after(() => {
			productsService.getById.restore();
		})


		it('é retornado o status 404', async () => {
			await productsController.getById(req, res, next);

			expect(fakeStatus.status).to.be.equal(404);
		});

		it('é retornado a mensagem "Product not found"', async () => {
			await productsController.getById(req, res, next);

			expect(fakeStatus.message).to.be.equal('Product not found');
		})
	});
});