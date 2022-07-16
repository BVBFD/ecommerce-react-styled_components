// import * as dotenv from 'dotenv';
const dotenv = require('dotenv');
// import * as express from 'express';
const express = require('express');
import { NextFunction, Request, Response } from 'express';
// import * as helmet from 'helmet';
const helmet = require('helmet');
// import * as cors from 'cors';
const cors = require('cors');
// import * as morgan from 'morgan';
const morgan = require('morgan');
import mongoose from 'mongoose';
// import * as cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');
// import * as bcrypt from 'bcryptjs';
const bcrypt = require('bcryptjs');

import userRouter from './routes/user';
import authRouter from './routes/auth';
import productRouter from './routes/product';
import cartRoute from './routes/cart';
import orderRoute from './routes/order';
import stripeRoute from './routes/stripe';
import { isCSRFToken } from './middlewares/isCSRFToken';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      `https://leoecommerceportfolio.netlify.app`,
      `https://leoadminportfolio.netlify.app`,
    ],
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
