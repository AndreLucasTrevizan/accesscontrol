import express from 'express';
import 'express-async-errors';
import cors from 'express';
import { config } from 'dotenv';
import { errorsMiddleware } from './middlewares/errors';
import router from './router';

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorsMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Running on http://localhost:${process.env.PORT}`);
});
