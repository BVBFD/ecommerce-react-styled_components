import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.toString().split(' ')[1];
    jwt.verify(token, process.env.JWT_SEC!, (error, user) => {
      if (error) res.status(403).json('Token is not valid');
      req.user = user;
      next();
    });
  }
};

const verifyTokenAndAuthorization = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(error, req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not allowed to do that!');
    }
  });
};

const verifyTokenAndAdmin = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  verifyToken(error, req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not allowed to do that!');
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };
