import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarService from '../../../service/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response, NextFunction } from 'express';
import { invalidCar, validCar } from '../mocks/mocks';


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

      // it('should return status code equal to 400 if receive an wrong object', async () => {
      //   req.body = invalidCar
      //   await carController.create(req, res);
      //   expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      //   expect((res.json as sinon.SinonStub).calledWith({ error: 'Bad Request' })).to.be.true;
      // });
  });
});