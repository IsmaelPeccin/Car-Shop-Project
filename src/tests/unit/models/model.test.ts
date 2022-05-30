import { expect } from 'chai';
import mongoose from 'mongoose';
import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { validCar, validCarWithId } from '../mocks/mocks';

const carModel = new CarModel();


describe('Testing Car Model', () => {
  beforeEach (() => {
    sinon.stub(mongoose.Model, 'create').resolves(validCar);
    sinon.stub(mongoose.Model, 'find').resolves(validCarWithId);
    sinon.stub(mongoose.Model, 'findById').resolves(validCarWithId[0]);
    sinon.stub(mongoose.Model, 'findByIdAndUpdate').resolves(validCarWithId[0]);
    sinon.stub(mongoose.Model, 'findByIdAndDelete').resolves(validCarWithId[0]);
  });

  afterEach (() => {
    (mongoose.Model.create as sinon.SinonStub).restore();
    (mongoose.Model.find as sinon.SinonStub).restore();
    (mongoose.Model.findById as sinon.SinonStub).restore();
    (mongoose.Model.findByIdAndUpdate as sinon.SinonStub).restore();
    (mongoose.Model.findByIdAndDelete as sinon.SinonStub).restore();
  });

  it('should create a new car and return new car', async () => {
    const car = await carModel.create(validCar);
    expect(car).to.be.an('object');
    expect(car).to.be.equal(validCar);
  });

  it('should find all cars', async () => {
    const cars = await carModel.read();
    expect(cars).to.be.an('array');
    expect(cars[0]).to.be.an('object');
    expect(cars).to.be.deep.equal(validCarWithId);
  });

  it('should find a car by id', async () => {
    const car = await carModel.readOne(validCarWithId[0]._id);
    expect(car).to.be.an('object');
    expect(car).to.be.deep.equal(validCarWithId[0]);
  });

  it('should update a car by id', async () => {
    const car = await carModel.update(validCarWithId[0]._id, validCar);
    expect(car).to.be.an('object');
    expect(car).to.be.deep.equal(validCar);
  });

  it('should delete a car by id', async () => {
    const car = await carModel.delete(validCarWithId[0]._id);
    expect(car).to.be.an('object');
    expect(car).to.be.deep.equal(validCarWithId[0]);
  });
});

