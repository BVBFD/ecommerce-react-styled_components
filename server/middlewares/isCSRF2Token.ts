import { NextFunction, Request, Response } from 'express';

export const isCSRF2Token = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const csrfToken: any = req.get('CSRF_TOKEN');

  if (!csrfToken) {
    return res.status(403).json('Fail Auth CSRF_TOKEN');
  }

  const validateCSRFToken =
    `${process.env.REACT_APP_CSRF_TOKEN}${csrfToken}` ===
    `${process.env.NODE_REACT_CSRF_TOKEN}`;

  if (!validateCSRFToken) {
    return res.status(403).json('Fail CSRF_TOKEN Check!');
  } else {
    next();
  }
};
