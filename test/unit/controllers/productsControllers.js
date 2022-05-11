const { expect } = require('chai');
const sinon = require('sinon');
const productsController = require('../../../controllers/productsController');
const productsService = require('../../../services/productsService');

describe('Camada do "controller" a função "getProducts"', () => {
	describe('quando não existem produtos no BD', () => {
		const req = {};
		const res = {status: 200};

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