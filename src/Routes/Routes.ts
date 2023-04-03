import { Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).getAll(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).getById(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).updateById(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).getAll(),
);

routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getById(),
);

routes.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

// routes.patch(
//   '/transfer/:id',
//   (req, res, next) => new TransferController(req, res, next).reversalRequest(),
// );

// routes.post(
//   '/key/register',
//   (req, res, next) => new KeyController(req, res, next).create(),
// );

export default routes;
