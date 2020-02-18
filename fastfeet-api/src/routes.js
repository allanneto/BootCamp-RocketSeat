import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import DeliveryActionController from './app/controllers/DeliverymanActionController';
import DeliveredController from './app/controllers/DeliveredController';
import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemController from './app/controllers/DeliverymanProblemController';
import ProblemAdminController from './app/controllers/ProblemAdminController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// ROTAS TESTADAS E OK
routes.post('/sessions', SessionController.store);

// ROTAS TESTADAS E OK
routes.get('/deliveryman/:id/deliveries', DeliveryActionController.index);

routes.patch(
  '/deliveryman/:id/deliveries/:delivery_id/deliver',
  upload.single('file'),
  DeliveredController.update
);

routes.get('/delivery/:delivery_id/problems', DeliveryProblemController.index);
routes.post('/delivery/:delivery_id/problems', DeliveryProblemController.store);

// ROTAS TESTADAS E OK
routes.use(authMiddleware);

// ROTAS TESTADAS E OK
routes.post('/users', UserController.store);
// routes.put('/users/:id', UserController.update);

// ROTAS TESTADAS E OK
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

// ROTAS TESTADAS E OK
routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.get('/deliveryman/:id', DeliverymanController.show);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// ROTAS TESTADAS E OK
routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.get('/delivery/:id', DeliveryController.show);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

routes.get('/problems', ProblemAdminController.index);
routes.patch(
  '/problem/:problem_id/cancel-delivery',
  ProblemAdminController.update
);

// ROTAS TESTADAS E OK
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
