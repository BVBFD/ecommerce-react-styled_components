import { Router, Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken';

const router = Router();

// Create
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
    // console.error(error);
  }
});

// Update
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
    // console.error(error);
  }
});

// Delete
router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('Order has been deleted...');
    } catch (error) {
      res.status(500).json(error);
      // console.error(error);
    }
  }
);

// Get User Orders
router.get(
  '/find/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error);
      // console.error(error);
    }
  }
);

// Get All
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
    // console.error(error);
  }
});

// Get Monthly Income
router.get(
  '/income',
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
      const income = await Order.aggregate([
        {
          $match: {
            // createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (error) {
      res.status(500).json(error);
      // console.error(error);
    }
  }
);

export default router;
