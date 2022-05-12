const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

describe('Camada de "serviço" função "getSales', () => {
	describe('quando não existe produto cadastrado', () => {

		const resultExecute = [];

		before(() => {
			sinon.stub(salesModel, 'getSales').resolves(resultExecute);
		});

		after(() => {
			salesModel.getSales.restore();
		})

		it('a função retorna um array', async () => {
			const result = await salesService.getSales();

			expect(result).to.be.an('array');
		});

		it('o array está vazio', async () => {
			const result = await salesService.getSales();

			expect(result).to.be.empty;
		});
	});

	describe('quando existe produto cadastrado', () => {

		const resultExecute = [{
			id: 1,
			date: 'Computador',
			}];

		before(() => {
			sinon.stub(salesModel, 'getSales').resolves(resultExecute);
		});

		after(() => {
			salesModel.getSales.restore();
		})

		it('a função retorna um array', async () => {
			const result = await salesService.getSales();

			expect(result).to.be.an('array');
		});

		it('o array está vazio', async () => {
			const result = await salesService.getSales();

			expect(result).to.be.not.empty;
		});


		it('o array possui objetos', async () => {
			const [result] = await salesService.getSales(); 
			expect(result).to.be.an('object');
		});

		it('o objeto que está no array tem os atributos "id" e "date"', async () => {
			const [result] = await salesService.getSales();
			expect(result).to.be.includes.all.keys('id', 'date');
		});
	});
});

describe('Camada de "serviço" função "create"', () => {
	describe('quando o produto é cadastrado', () => {
		const fakeBody = 
		[
			{
				"productId": 1,
				"quantity": 2
			}
		];

		const fakeProduct = 
		{
			"id": 4,
			"itemsSold": [
				{
					"productId": 1,
					"quantity": 2
				}
			]
		}

		before(() => {
			sinon.stub(salesModel, 'create').resolves(fakeProduct);
		});

		after(() => {
			salesModel.create.restore();
		});

		it('a função retorna um objeto', async () => {
			const response = await salesService.create(fakeBody);

			expect(response).to.be.a('object');
		});

		it('o objeto possui a propriedade "id"', async () => {
			const response = await salesService.create(fakeBody);

			expect(response).to.have.a.property('id');
		});

		it('o "id" tem o valor 2', async () => {
			const response = await salesService.create(fakeBody);

			expect(response.id).to.be.equal(4);
		});
	});
});

describe('Camada de "serviço" função "getById"', () => {
	describe('quando existe o produto no BD', () => {
		const id = 2;

		const fakeProduct = 
		[
			{
				date: "2022-05-12T22:36:44.000Z",
				productId: 3,
				quantity: 15
			}
		]

		before(() => {
			sinon.stub(salesModel, 'getById').resolves([fakeProduct]);
		});

		after(() => {
			salesModel.getById.restore();
		});

		it('a função retorna um array', async () => {
			const response = await salesService.getById(id);

			expect(response).to.be.a('array');
		});

		it('o array não está vazio', async () => {
			const response = await salesService.getById(id);

			expect(response.length).to.be.not.equal(0);
		});

		it('o array tem contem objeto', async () => {
			const response = await salesService.getById(id);

			expect(response[0]).to.be.a('array');
		});
	});
});