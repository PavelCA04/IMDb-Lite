import express from 'express';

import actorController from '../controllers/actor';
import movieController from '../controllers/movie';

const routes = express.Router();

routes.post('/actor', actorController.createActor);
routes.get('/actor', actorController.readActors);
routes.get('/actor/:id', actorController.readActorByID);
routes.patch('/actor/:id', actorController.updateActor);
routes.delete('/actor/:id', actorController.deleteActor);

routes.post('/movie', movieController.createMovie);
routes.get('/movie', movieController.readMovies);
routes.get('/movie/:id', movieController.readMovieByID);
routes.patch('/movie/:id', movieController.updateMovie);
routes.delete('/movie/:id', movieController.deleteMovie);

export default routes;