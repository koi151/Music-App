import express, { Express, Request, Response } from 'express';
import dotenv from "dotenv"; 
import * as database from './config/database';

dotenv.config();

database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.get('/topics', (req: Request, res: Response) => {
  res.send('Song topics');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
