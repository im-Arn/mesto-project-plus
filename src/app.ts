import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

// Иниц Express и порты
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());

// Подключаемся к БД
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// Исп мидлвару с моковым пользователем
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '667cd4ee7bea4e0fac2c6415', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});

// Импортируем роуты со всего приложения
app.use('/', routes);

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(+PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});

// {
//     'name':'Elerys',
//     'about': 'about',
//     'avatar': 'https://s13.stc.all.kpcdn.net/afisha/msk/wp-content/uploads/sites/5/2023/01/kadr-iz-filma-avatar-put-vody.jpg'
// }
