import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get(
  '/usertest',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json('test');
    } catch (error) {
      console.error(error);
    }
  }
);

router.post(
  '/userposttest',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = req.body.username;
      console.log(username);
      res.status(201).json(`Your username is: ${username}`);
    } catch (error) {
      console.error(error);
    }
  }
);

export default router;
