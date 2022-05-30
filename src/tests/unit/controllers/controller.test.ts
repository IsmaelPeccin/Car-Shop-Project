import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarService from '../../../service/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response, NextFunction } from 'express';
import { validCar, validCarWithId } from '../mocks/mocks';


chai.use(chaiHttp);

const { expect } = chai;

const carService = new CarService();
const carController = new CarController(carService);

const req = {} as Request;
const res = {} as Response;
const next = {} as NextFunction;

describe('Testing Car Controller', () => {
  describe('Testing create method', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(carService, 'create').resolves(validCar);
    });

    after(()=>{
      (carService.create as sinon.SinonStub).restore();
    });

      it('should return status code equal to 201 and return new car', async () => {
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(validCar)).to.be.true;
      });

      it('should return status code equal to 500 if receive empty or null body ', async () => {
        (carService.create as sinon.SinonStub).rejects();
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
  });

  describe('Testing read method', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(carService, 'read').resolves(validCarWithId);
    });

    after(()=>{
      (carService.read as sinon.SinonStub).restore();
    });

      it('should return status code equal to 200 and return all cars', async () => {
        await carController.read(req, res);
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(validCarWithId)).to.be.true;
      });

      it('should return status code equal to 500 and message internal server error if an internal error occurs  ', async () => {
        (carService.read as sinon.SinonStub).rejects();
        await carController.read(req, res);
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal Server Error' })).to.be.true;
      });
  });
});