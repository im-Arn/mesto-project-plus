import { model, Schema, Model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { defaultProfile } from '../constants/const';
import AuthError from '../errors/AuthError';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: defaultProfile.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: defaultProfile.about,
  },
  avatar: {
    type: String,
    default: defaultProfile.avatar,
    validate: (v: string) => validator.isURL(v),
  },
  email: {
    type: String,
    required: true,
    validate: (v: string) => validator.isEmail(v),
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  function findUserByCredentials(email: string, password: string): Promise<IUser | null> {
    return this.findOne({ email })
      .select('+password')
      .then((user: IUser | null) => {
        if (!user) {
          return Promise.reject(new AuthError('Неправильные почта или пароль'));
        }
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new AuthError('Неправильные почта или пароль'));
            }
            return user;
          });
      });
    // eslint-disable-next-line
  }
);
export default model<IUser, UserModel>('user', userSchema);
