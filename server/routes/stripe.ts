import { isCSRF2Token } from './../middlewares/isCSRF2Token';
import { Router, Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2020-08-27',
  typescript: true,
});

router.post(
  '/payment',
  isCSRF2Token,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: 'usd',
        },
        {
          idempotencyKey: `${Date.now()}${Math.random()}`,
        }
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
      // console.error(error);
    }
  }
);

export default router;
