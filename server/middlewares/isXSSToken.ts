import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

export const isXSSToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const xssToken = req.cookies['XSS_TOKEN'];

  if (!xssToken) {
    return res.status(403).json('Fail Auth XSS_TOKEN');
  }

  const validateXSSToken = bcrypt.compare(xssToken, process.env.XSS_TOKEN);

  if (!validateXSSToken) {
    return res.status(403).json('Fail Auth XSS_TOKEN Check');
  } else {
    next();
  }
};
