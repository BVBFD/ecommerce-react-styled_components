import { Router, Request, Response, NextFunction } from 'express';
import { verifyTokenAndAdmin } from '../middlewares/verifyToken';
import CryptoJS from 'crypto-js';
import User from '../models/User';

const router = Router();

// update
router.put(
  '/:id',

  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// delete
router.delete(
  '/:id',

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted...');
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// get user
router.get(
  '/find/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user!._doc;
      res.status(200).json(others);
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// get all user
router.get(
  '/',

  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

// get user stats
router.get(
  '/stats',

  async (req: Request, res: Response, next: NextFunction) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        { $project: { month: { $month: '$createdAt' } } },
        { $group: { _id: '$month', total: { $sum: 1 } } },
      ]);
      res.status(200).json(data);
    } catch (error) {
      // res.status(500).json(error);
      console.error(error);
    }
  }
);

export default router;
