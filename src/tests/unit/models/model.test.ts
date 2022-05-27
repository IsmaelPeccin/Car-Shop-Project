import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { validCar } from '../mocks/mocks';

const carModel = new CarModel();


describe('CarModel', () => {
  before (() => {
    sinon.stub(mongoose.Model, 'create').resolves(validCar);
  });

  after (() => {
    (mongoose.Model.create as sinon.SinonStub).restore();
  });

  it('should create a new car and return new car', async () => {
    const car = await carModel.create(validCar);
    expect(car).to.be.an('object');
    expect(car).to.be.equal(validCar);
  });
});

