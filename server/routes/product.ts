import { Router, Request, Response, NextFunction } from 'express';
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from '../middlewares/verifyToken';
import Product from '../models/Product';

const router = Router();

// Create
router.post(
  '/',
  verifyTokenAndAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = new Product(req.body);

    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// Update
router.put(
  '/:id',
  verifyTokenAndAdmin,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// Delete
router.delete(
  '/:id',
  verifyTokenAndAuthorization,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json('Product has been deleted...');
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// Get product
router.get(
  '/find/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// Get all products
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    // res.status(500).json(error);
    console.error(error);
  }
});

export default router;
