import express, { Express } from 'express';
import dotenv from "dotenv"; 
import * as database from './config/database';

import clientRoutes from './routes/client/index.route';

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

// Client routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
