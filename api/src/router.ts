import { Request, Response, Router } from 'express';
import { UsersRouter } from './modules/users/router';

const router = Router();

router.get('/error', (req: Request, res: Response) => {
  throw new Error('Errors ok');
});

router.use(UsersRouter);

export default router;
