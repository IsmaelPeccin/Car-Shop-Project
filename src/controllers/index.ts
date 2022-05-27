import { Request, Response } from 'express';
import Service from '../service';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
  id = 'Id must have 24 hexadecimal characters',
}

abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  abstract update(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res > => {
    const { id } = req.params;
    try {
      if (!id) {
        return res.status(400).json({ error: this.errors.requiredId });
      }
      const obj = await this.service.delete(id);
      if (!obj) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };
}

export default Controller;
