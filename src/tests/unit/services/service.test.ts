import { expect } from 'chai';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { invalidCar, validCar, validCarWithId } from '../mocks/mocks';

const carModel = new CarModel();
const carService = new CarService(carModel);

describe ('Testing Car Service', () => {
  beforeEach (() => {
    sinon.stub(carModel, 'create').resolves(validCar);
    sinon.stub(carModel, 'read').resolves(validCarWithId);
  });

  afterEach (() => {
    (carModel.create as sinon.SinonStub).restore();
    (carModel.read as sinon.SinonStub).restore();
  });

  it ('should create a new car and return new car', async () => {
    const car = await carService.create(validCar);
    expect(car).to.be.an('object');
    expect(car).to.be.equal(validCar);
  });

  it ('should returns an error when receiving an object without some mandatory properties', async () => {
    const car = await carService.create(invalidCar);
    expect(car).to.be.an('object');
    expect(car).to.be.property('error');
  });

  it ('should find all cars', async () => {
    const cars = await carService.read();
    expect(cars).to.be.an('array');
    expect(cars[0]).to.be.an('object');
    expect(cars).to.be.deep.equal(validCarWithId);
  });
});

