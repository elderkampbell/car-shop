import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Testa a criação de um moto', function () {
  it('Deveria criar um MOTO com SUCESSO', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Fusca',
      year: 1930,
      color: 'Azul',
      status: true,
      buyValue: 1.000,
      category: 'Street',
      engineCapacity: 2,
    };

    const motorcycleOutput: Motorcycle = new Motorcycle(
      { 
        model: 'Fusca',
        year: 1930,
        color: 'Azul',
        status: true,
        buyValue: 1.000,
        category: 'Street',
        engineCapacity: 2,
      },
    );

    sinon.stub(Model, 'create').resolves(motorcycleOutput);
    const service = new MotorcycleService();
    const result = await service.create(motorcycleInput);

    expect(result).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria lançar uma exceção quando a id não existe', async function () {
    const MotorcycleId = '000000';

    sinon.stub(Model, 'findById').resolves({});

    try {
      const service = new MotorcycleService();
      await service.getById(MotorcycleId);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
    }
  });

  it('Confere se o metodo get lista todos os carros', async function () {
    const MotorcycleInput = [{
      model: 'Fusca',
      year: 1930,
      color: 'Azul',
      status: true,
      buyValue: 1.000,
      category: 'Street',
      engineCapacity: 2,
    }];
    const motorcycleOutput = MotorcycleInput.map((motorcycle) => new Motorcycle(motorcycle));
    sinon.stub(Model, 'find').resolves(motorcycleOutput);

    const service = new MotorcycleService();
    const motorcycleArray = await service.getAllMotorcycles();
    expect(motorcycleArray).to.be.deep.equal(motorcycleOutput);
  });

  it('Deveria lançar uma exceção quando a id é inválido', async function () {
    const motorcycleInput: IMotorcycle = {
      model: 'Fusca',
      year: 1930,
      color: 'Azul',
      status: true,
      buyValue: 1.000,
      category: 'Street',
      engineCapacity: 2,
    };
    const motorcycleId = '000000';

    sinon.stub(Model, 'update').resolves();
    sinon.stub(Model, 'findOne').resolves(false);
    
    try {
      const service = new MotorcycleService();
      await service.updateById(motorcycleId, motorcycleInput);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});
