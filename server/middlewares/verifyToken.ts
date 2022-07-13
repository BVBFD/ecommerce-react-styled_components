import { verify, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyTokenAndAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers.token);
  const token = req.headers.token?.toString().split(' ')[1] as string;
  console.log(token);

  const checkJwt: string | JwtPayload = verify(token, process.env.JWT_SEC);
  const { isAdmin }: any = checkJwt;

  if (isAdmin) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export { verifyTokenAndAdmin };
