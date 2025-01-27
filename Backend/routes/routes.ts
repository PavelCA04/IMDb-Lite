import express from 'express';

import actorController from '../controllers/actor';

const routes = express.Router();

routes.post('/actor', actorController.createActor);
routes.get('/actor', actorController.readActors);
routes.get('/actor/:id', actorController.readActorByID);
routes.patch('/actor/:id', actorController.updateActor);
routes.delete('/actor/:id', actorController.deleteActor);

export default routes;