const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');

describe('Camada de "serviço" função "getProducts', () => {
	describe('quando não existe produto cadastrado', () => {

		const resultExecute = [];

		before(() => {
			sinon.stub(productsModel, 'getProducts').resolves(resultExecute);
		});

		after(() => {
			productsModel.getProducts.restore();
		})

		it('a função retorna um array', async () => {
			const result = await productsService.getProducts();

			expect(result).to.be.an('array');
		});

		it('o array está vazio', async () => {
			const result = await productsService.getProducts();

			expect(result).to.be.empty;
		});
	});

	describe('quando existe produto cadastrado', () => {

		const resultExecute = [{
			"id": 1,
			"name": "Martelo de Thor",
			"quantity": 10
			}];

		before(() => {
			sinon.stub(productsModel, 'getProducts').resolves(resultExecute);
		});

		after(() => {
			productsModel.getProducts.restore();
		})

		it('a função retorna um array', async () => {
			const result = await productsService.getProducts();

			expect(result).to.be.an('array');
		});

		it('o array está vazio', async () => {
			const result = await productsService.getProducts();

			expect(result).to.be.not.empty;
		});


		it('o array possui objetos', async () => {
			const [result] = await productsService.getProducts(); 
			expect(result).to.be.an('object');
		});

		it('o objeto que está no array tem os atributos "id", "name", "quantity"', async () => {
			const [result] = await productsService.getProducts(); 
			expect(result).to.be.includes.all.keys('id', 'name', 'quantity');
		});
	});
});

describe('Camada de "serviço" função "create"', () => {
	describe('quando o produto é cadastrado', () => {
		const name = "Bicicleta";
		const quantity = 7

		const fakeProduct = {
			id: 2,
			name: 'Bicicleta',
			quantity: 7
		}

		before(() => {
			sinon.stub(productsModel, 'getByName').resolves([]);
			sinon.stub(productsModel, 'create').resolves(fakeProduct);
		});

		after(() => {
			productsModel.getByName.restore();
			productsModel.create.restore();
		});

		it('a função retorna um objeto', async () => {
			const response = await productsService.create(name, quantity);

			expect(response).to.be.a('object');
		});

		it('o objeto possui a propriedade "id"', async () => {
			const response = await productsService.create(name, quantity);

			expect(response).to.have.a.property('id');
		});

		it('o "id" tem o valor 2', async () => {
			const response = await productsService.create(name, quantity);

			expect(response.id).to.be.equal(2);
		});
	});
});

describe('Camada de "serviço" função "getById"', () => {
	describe('quando existe o produto no BD', () => {
		const id = 2;

		const fakeProduct = {
			id: 2,
			name: 'Bicicleta',
			quantity: 7
		}

		before(() => {
			sinon.stub(productsModel, 'getById').resolves(fakeProduct);
		});

		after(() => {
			productsModel.getById.restore();
		});

		it('a função retorna um objeto', async () => {
			const response = await productsService.getById(id);

			expect(response).to.be.a('object');
		});

		it('o objeto possui a propriedade "id"', async () => {
			const response = await productsService.getById(id);

			expect(response).to.have.a.property('id');
		});

		it('o "id" tem o valor 2', async () => {
			const response = await productsService.getById(id);

			expect(response.id).to.be.equal(2);
		});
		
		it('o "id" tem o valor 2', async () => {
			const response = await productsService.getById(id);

			expect(response.name).to.be.equal('Bicicleta');
		});
	});
});