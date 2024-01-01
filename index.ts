import express, { Express } from 'express';
import dotenv from "dotenv"; 
import * as database from './config/database';
import path from 'path';
import { systemConfig } from './config/system';
import methodOverride from 'method-override'

import clientRoutes from './routes/client/index.route';
import adminRoutes from './routes/admin/index.route';

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }))

// for using PATCH
app.use(methodOverride('_method'))

app.use(express.static(`${__dirname}/public`));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// App local variables
app.locals.adminPrefix = systemConfig.adminPrefix;

// Admin routes
adminRoutes(app);

// Client routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
