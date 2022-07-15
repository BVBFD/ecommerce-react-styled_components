import { verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyTokenAndAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.token?.toString().split(' ')[1] as string;

  const checkJwt: string | JwtPayload = verify(token, process.env.JWT_SEC);
  const { isAdmin }: any = checkJwt;

  if (isAdmin) {
    next();
  } else {
    res.status(401).json('Only the admin can edit!!');
  }
};

export { verifyTokenAndAdmin };
