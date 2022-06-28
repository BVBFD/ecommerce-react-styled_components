import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

mongoose
  .connect(process.env.MONGO_DB_URL!)
  .then(() => console.log('Mongo DB Running Start!!'))
  .catch((error) => console.error(error));

app.listen(process.env.PORT || 8080, () => {
  console.log('Hi Seong Eun Lee!');
  console.log('Backend server is running!!');
});
