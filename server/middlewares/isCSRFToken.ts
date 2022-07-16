import { compare } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

export const isCSRFToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { mmTk } = req.body;
  const csrfToken = mmTk;

  if (!csrfToken) {
    return res.status(404).json(false);
  }

  const validateCSRFToken = compare(csrfToken, process.env.CSRF_TOKEN);

  if (!validateCSRFToken) {
    return res.status(403).json(false);
  } else {
    return res.status(200).json(true);
  }
};
