import { Express } from 'express';
import { systemConfig } from "../../config/system"; 

import { dashboardRoutes } from  './dashboard.route';
import { topicRoutes } from  './topic.route';
import { songRoutes } from  './song.route';

const adminRoutes = (app: Express): void => {
  const ADMIN_PATH = '/' + systemConfig.adminPrefix;

  app.use(ADMIN_PATH + '/dashboard', dashboardRoutes);

  app.use(ADMIN_PATH + '/topics', topicRoutes);

  app.use(ADMIN_PATH + '/songs', songRoutes);
}

export default adminRoutes;