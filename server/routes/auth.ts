import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';
import CryptoJS from 'crypto-js';
import { sign } from 'jsonwebtoken';

const router = Router();
router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body?.password,
        process.env.PASS_SEC
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
      // async, await를 안 붙이면 save() 즉각적으로 실행이 되어지기 때문
      // (데이터 베이스랑 통신하면서 정보를 저장하는 것은 시간이 걸린다.)
      // savedUser가 없는 상태에서 json을 보내게 되어 오류 발생
      // 그래서 async, await를 붙임!!
    } catch (error) {
      console.error(error);
      // res.status(500).json(error);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ username: req.body.username });

      !user && res.status(401).json('Wrong credentials');

      if (user?.password == null) {
        res.status(500).json("can't read password");
      }

      const hashedPassword = CryptoJS.AES.decrypt(
        user!.password,
        process.env.PASS_SEC
      );

      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      const inputPassword = req.body?.password;

      originalPassword !== inputPassword &&
        res.status(401).json('Wrong credentials');

      const accessToken = sign(
        {
          id: user!._id,
          isAdmin: user!.isAdmin,
        },
        process.env.JWT_SEC,
        {
          expiresIn: '3d',
        }
      );

      const { password, ...others } = user!._doc;
      res.status(200).json({ ...others, accessToken });
    } catch (error) {
      console.error(error);
      // res.status(500).json(error);
    }
  }
);

export default router;
