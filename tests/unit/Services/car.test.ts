import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Testa a criação de um carro', function () {
  it('Deveria criar um CARRO com SUCESSO', async function () {
    const carInput: ICar = {
      model: 'Fusca',
      year: 1930,
      color: 'Azul',
      status: true,
      buyValue: 1.000,
      doorsQty: 2,
      seatsQty: 5,
    };

    const carOutput: Car = new Car(
      { 
        model: 'Fusca',
        year: 1930,
        color: 'Azul',
        status: true,
        buyValue: 1.000,
        doorsQty: 2,
        seatsQty: 5, 
      },
    );

    sinon.stub(Model, 'create').resolves(carOutput);
    const service = new CarService();
    const result = await service.create(carInput);

    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria lançar uma exceção quando a id não existe', async function () {
    const carId = '000000';

    sinon.stub(Model, 'findById').resolves({});

    try {
      const service = new CarService();
      await service.getById(carId);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Confere se o metodo get lista todos os motos', async function () {
    const carInput = [{
      model: 'Fusca',
      year: 1930,
      color: 'Azul',
      status: true,
      buyValue: 1.000,
      doorsQty: 2,
      seatsQty: 5,
    }];
    const carOutput = carInput.map((car) => new Car(car));
    sinon.stub(Model, 'find').resolves(carOutput);

    const service = new CarService();
    const carArray = await service.getAllCars();
    expect(carArray).to.be.deep.equal(carOutput);
  });

  afterEach(function () {
    sinon.restore();
  });
});
