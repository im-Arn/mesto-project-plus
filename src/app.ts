import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '667cd4ee7bea4e0fac2c6415',
  };
  next();
});
app.use('/', routes);

app.listen(+PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Приложение запущено на порту ${PORT}`);
});