import {
  Request,
  Response,
  NextFunction
} from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  id: number;
}

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const has_token = req.headers['authorization'];

  if (!has_token) {
    res.status(400).json({ msg: 'Token não encontrado' });
  } else {
    const token = has_token.split(' ')[1];

    verify(token, String(process.env.API_PASSWORD), (err) => {
      if (err) {
        res.status(400).json({ msg: 'Token invalido' });
      }

      next();
    });
  }
}
