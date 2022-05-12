const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Camada de "modelo" função "getProducts"', () => {
	describe('quando não existe produto cadastrado', () => {

		const resultExecute = [[]];

		before(() => {
			sinon.stub(connection, 'execute').resolves(resultExecute);
		});

		after(() => {
			connection.execute.restore();
		})

		it('a função retorna um array', async () => {
			const result = await productsModel.getProducts();

			expect(result).to.be.an('array');
		});

		it('o array está vazio', async () => {
			const result = await productsModel.getProducts();

			expect(result).to.be.empty;
		});
	});

	describe('quando existe produto cadastrado', () => {

		const resultExecute = [[{
			id: 1,
			name: 'Computador',
			quantity: 2
		}]];

		before(() => {
			sinon.stub(connection, 'execute').resolves(resultExecute);
		});

		after(() => {
			connection.execute.restore();
		})


		it('a função retorna um array', async () => {
			const result = await productsModel.getProducts();

			expect(result).to.be.an('array');
		});

		it('o array não está vazio', async () => {
			const result = await productsModel.getProducts();

			expect(result).to.be.not.empty;
		});


		it('o array possui objetos', async () => {
			const [result] = await productsModel.getProducts(); 
			expect(result).to.be.an('object');
		});

		it('o objeto que está no array tem os atributos "id", "name" e "quantity"', async () => {
			const [result] = await productsModel.getProducts(); 
			expect(result).to.be.includes.all.keys('id', 'name', 'quantity');
		});
	});
})

describe('Camada de "modelo" função "create"', () => {
	describe('quando o produto é inserido no BD', () => {
		const name = "Bicicleta";
		const quantity = 7

		before(() => {
			sinon.stub(connection, 'execute').resolves([{ insertId: 2 }]);
		});

		after(() => {
			connection.execute.restore();
		});

		it('a função retorna um objeto', async () => {
			const response = await productsModel.create(name, quantity);

			expect(response).to.be.a('object');
		});

		it('o objeto possui a propriedade "id"', async () => {
			const response = await productsModel.create(name, quantity);

			expect(response).to.have.a.property('id');
		});

		it('o "id" tem o valor 2', async () => {
			const response = await productsModel.create(name, quantity);

			expect(response.id).to.be.equal(2);
		});
	});
});

describe('Camada de "modelo" função "getById"', () => {
	describe('quando existe o produto no BD', () => {
		const id = 2;

		const fakeProduct = [{
			id: 2,
			name: 'Bicicleta',
			quantity: 7
		}]

		before(() => {
			sinon.stub(connection, 'execute').resolves([fakeProduct]);
		});

		after(() => {
			connection.execute.restore();
		});

		it('a função retorna um objeto', async () => {
			const response = await productsModel.getById(id);

			expect(response).to.be.a('object');
		});

		it('o objeto possui a propriedade "id"', async () => {
			const response = await productsModel.getById(id);

			expect(response).to.have.a.property('id');
		});

		it('o "id" tem o valor 2', async () => {
			const response = await productsModel.getById(id);

			expect(response.id).to.be.equal(2);
		});
		
		it('o "id" tem o valor 2', async () => {
			const response = await productsModel.getById(id);

			expect(response.name).to.be.equal('Bicicleta');
		});
	});

	describe('quando não existe o produto no BD', () => {
		const id = 2;

		before(() => {
			sinon.stub(connection, 'execute').resolves([[[]]]);
		});

		after(() => {
			connection.execute.restore();
		});

		it('a função retorna um array', async () => {
			const response = await productsModel.getById(id);

			expect(response).to.be.a('array');
		});

		it('o array está vazio', async () => {
			const response = await productsModel.getById(id);

			expect(response.length).to.be.equal(0);
		});
	});
});
