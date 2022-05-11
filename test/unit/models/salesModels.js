const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Camada de "modelo" função "getSales"', () => {
	describe('quando não existe produto cadastrado', () => {

		const resultExecute = [[]];

		before(() => {
			sinon.stub(connection, 'execute').resolves(resultExecute);
		});

		after(() => {
			connection.execute.restore();
		})

		it('a função retorna um array', async () => {
			const result = await salesModel.getSales();

			expect(result).to.be.an('array');
		});

		it('o array está vazio', async () => {
			const result = await salesModel.getSales();

			expect(result).to.be.empty;
		});
	});

	describe('quando existe produto cadastrado', () => {

		const resultExecute = [[{
			id: 1,
			date: 'Computador',
		}]];

		before(() => {
			sinon.stub(connection, 'execute').resolves(resultExecute);
		});

		after(() => {
			connection.execute.restore();
		})


		it('a função retorna um array', async () => {
			const result = await salesModel.getSales();

			expect(result).to.be.an('array');
		});

		it('o array não está vazio', async () => {
			const result = await salesModel.getSales();

			expect(result).to.be.not.empty;
		});


		it('o array possui objetos', async () => {
			const [result] = await salesModel.getSales();
			expect(result).to.be.an('object');
		});

		it('o objeto que está no array tem os atributos "id" e "date"', async () => {
			const [result] = await salesModel.getSales();
			expect(result).to.be.includes.all.keys('id', 'date');
		});
	});
})

describe('Camada de "modelo" função "create"', () => {
	describe('quando o produto é inserido no BD', () => {
		const name = "Bicicleta";
		const quantity = 7

		const fakeProduct =  
		[
			{
				"productId": 1,
				"quantity": 2
			}
		];

		before(() => {
			sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
		});

		after(() => {
			connection.execute.restore();
		});

		it('a função retorna um objeto', async () => {
			const response = await salesModel.create(fakeProduct);

			expect(response).to.be.a('object');
		});

		it('o objeto possui a propriedade "id"', async () => {
			const response = await salesModel.create(fakeProduct);

			expect(response).to.have.a.property('id');
		});

		it('o "id" tem o valor 2', async () => {
			const response = await salesModel.create(fakeProduct);

			expect(response.id).to.be.equal(2);
		});
	});
});