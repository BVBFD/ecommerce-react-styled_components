import { Router, Request, Response, NextFunction } from 'express';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken';
import Cart from '../models/Cart';

const router = Router();

// Create
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
    // console.error(error);
  }
});

// Update
router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
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
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json('Cart has been deleted...');
    } catch (error) {
      res.status(500).json(error);
      // console.error(error);
    }
  }
);

// Get user cart
router.get(
  '/find/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
      // console.error(error);
    }
  }
);

// Get all
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
    // console.error(error);
  }
});

export default router;
