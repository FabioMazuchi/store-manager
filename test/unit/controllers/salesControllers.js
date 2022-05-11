const { expect } = require('chai');
const sinon = require('sinon');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');

describe('Camada de "controller" função "getSales', () => {
	describe('quando não existem produtos no BD', () => {
		const req = {};
		const res = {status: 200};

		before(() => {
			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(salesService, 'getSales').resolves([]);
		})

		after(() => {
			salesService.getSales.restore();
		});


		it('é retornado o método "status" com o código 200', async () => {
			await salesController.getSales(req, res);

			expect(res.status.calledWith(200)).to.be.equal(false);
		});

		it('é retornado o método "json" contendo um array', async () => {
			await salesController.getSales(req, res);

			expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
		})
	});
	
	
});

describe('Camada do "controller" a função "create"', () => {
	describe('quando o produto é cadastrado no BD', () => {
		const req = {};
		const res = {};
		
		const fakeSales = {
			id: 2,
			name: 'Bicicleta',
			quantity: 7
		};

		before(() => {
			req.body =   
			[
				{
					"productId": 1,
					"quantity": 2
				}
			]

			res.status = sinon.stub().returns(res);
			res.json = sinon.stub().returns();

			sinon.stub(salesService, 'create').resolves(fakeSales);
		});

		after(() => {
			salesService.create.restore();
		})


		it('é retornado o status 201', async () => {
			await salesController.create(req, res);

			expect(res.status.calledWith(201)).to.be.equal(true);
		});

		it('é retornado o método "json" contendo um array', async () => {
			await salesController.create(req, res);

			expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
		})
	});
});