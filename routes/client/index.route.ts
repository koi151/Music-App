import { Express } from 'express';
import { topicRoutes } from './topic.route';
import { songRoutes } from './song.route';
import { favoriteSongsRoutes } from './favorite-song.route';

const clientRoutes = (app: Express): void => {

  app.use('/topics', topicRoutes);

  app.use('/songs', songRoutes);

  app.use('/favorite-songs', favoriteSongsRoutes);
}

export default clientRoutes;