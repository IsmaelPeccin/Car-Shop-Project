import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { validCar, validCarWithId } from '../mocks/mocks';

const carModel = new CarModel();


describe('CarModel', () => {
  before (() => {
    sinon.stub(mongoose.Model, 'create').resolves(validCar);
    sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(validCarWithId);
  });

  after (() => {
    (mongoose.Model.create as sinon.SinonStub).restore();
    (mongoose.Model.findByIdAndUpdate as sinon.SinonStub).restore();
  });

  it('should create a new car and return new car', async () => {
    const car = await carModel.create(validCar);
    expect(car).to.be.an('object');
    expect(car).to.be.equal(validCar);
  });

  it('should updated a car', async () => {
    const car = await carModel.update('5e9f8f8f9c8f8f8f8f8f8f8f', validCarWithId[0]);
    expect(car).to.be.an('object');
    expect(car).to.be.deep.equal(validCarWithId[0]);
  });
});

