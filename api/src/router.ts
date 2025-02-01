import { Request, Response, Router } from 'express';

const router = Router();

router.get('/error', (req: Request, res: Response) => {
  throw new Error('Errors ok');
});

export default router;
