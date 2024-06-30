import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import routes from './routes/index';
import auth from './middlewares/auth';
import { loginUser, createUser } from './controllers/users';
import { errorLogger, requestLogger } from './middlewares/logger';
import { valLogin, valUser } from './constants/validate';
import handleServerErrors from './errors/handleServerErrors';

// Иниц Express и порты
const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
// Подключаемся к БД
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(requestLogger);
app.post('/signin', valLogin, loginUser); // роуты
app.post('/signup', valUser, createUser); // роуты
// Аутентификация
app.use(auth);
app.use(errorLogger);
// Импортируем роуты со всего приложения
app.use(routes);
app.use(errors());
app.use(handleServerErrors);

// Если всё работает, консоль покажет, какой порт приложение слушает
app.listen(+PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
