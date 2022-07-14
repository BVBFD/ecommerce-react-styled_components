import 'dotenv/config';
// es6에서 express import 하기전에 dotenv config 설정을 해줘야 에러가 안남!!
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import productRouter from './routes/product';
import cartRoute from './routes/cart';
import orderRoute from './routes/order';
import stripeRoute from './routes/stripe';
import { isCSRFToken } from './middlewares/isCSRFToken';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [`http://localhost:3000`, `http://localhost:3001`],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan('tiny'));
app.use(cookieParser());

app.get(
  '/api/getXSSToken',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const XSS_TOKEN = await bcrypt.hash(process.env.XSS_TOKEN, 1);
      res.cookie('XSS_TOKEN', XSS_TOKEN, {
        maxAge: 3 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.status(200).json(`X토큰 생성!!`);
    } catch (error) {
      console.log(error);
    }
  }
);

app.get(
  '/api/getCSRFToken',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CSRF_TOKEN = await bcrypt.hash(process.env.CSRF_TOKEN, 1);
      res.status(201).json(CSRF_TOKEN);
    } catch (error) {
      console.log(error);
    }
  }
);

app.post('/api/checkCSRFToken', isCSRFToken);

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
