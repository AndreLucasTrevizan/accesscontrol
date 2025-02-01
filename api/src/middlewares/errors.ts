import { Request, Response, NextFunction } from 'express';

export const errorsMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof Error) {
    res.status(400).json({ msg: err.message });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
}