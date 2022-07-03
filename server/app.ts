import 'dotenv/config';
// es6에서 express import 하기전에 dotenv config 설정을 해줘야 에러가 안남!!
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import productRouter from './routes/product';
import cartRoute from './routes/cart';
import orderRoute from './routes/order';
import stripeRoute from './routes/stripe';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(404);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

mongoose
  .connect(process.env.MONGO_DB_URL, { dbName: 'ecommerce' })
  .then(() => console.log('Mongo DB Running Start!!'))
  .catch((error) => console.error(error));

app.listen(process.env.PORT || 8080, () => {
  console.log('Hi Seong Eun Lee!');
  console.log('Backend server is running!!');
});
