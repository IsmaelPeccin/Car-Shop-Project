import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { Response, NextFunction } from 'express';
import { validCar, validCarWithId, invalidCar } from '../mocks/mocks';


chai.use(chaiHttp);

const { expect } = chai;

const carService = new CarService();
const carController = new CarController(carService);

const req = {
  body: {},
  params: {}
} as any;

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

  describe('Testing update method', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(carService, 'update').resolves(validCarWithId[0]);
    });

    after(()=>{
      (carService.update as sinon.SinonStub).restore();
    });

      it('should return status code equal to 200 and return updated car', async () => {
        req.body = validCar;
        req.params = { id: '5e9f8f8f9c8f8f8f8f8f8f8f' };
        await carController.update(req, res);
        expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith(validCarWithId[0])).to.be.true;
      });

      it('should return an error if the id is not valid', async () => {
        req.body = validCar;
        req.params = { id: '5e9f8f8f9c8f' };
        await carController.update(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Id must have 24 hexadecimal characters' })).to.be.true;
      });

      // it('should return status 404 if the body is wrong', async () => {
      //   req.body = invalidCar;
      //   await carController.update(req, res);
      //   expect((res.status as sinon.SinonStub).calledWith(404)).to.be.true;
      //   expect((res.json as sinon.SinonStub).calledWith({ error: 'Bad request' })).to.be.true;
      // });

      // it('should return status code equal to 500 and message internal server error if an internal error occurs  ', async () => {
      //   (carService.update as sinon.SinonStub).rejects();
      //   await carController.update(req, res);
      //   expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      //   expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal Server Error' })).to.be.true;
      // });
  });
});
