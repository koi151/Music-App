import { Express } from 'express';
import { dashboardRoutes } from  './dashboard.route';

import { systemConfig } from "../../config/system"; 

const adminRoutes = (app: Express): void => {
  const ADMIN_PATH = '/' + systemConfig.adminPrefix;

  app.use(ADMIN_PATH + '/dashboard', dashboardRoutes);
}

export default adminRoutes;