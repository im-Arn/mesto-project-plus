import { model, Schema, Model, Document } from 'mongoose';
import validator from 'validator';
import { defaultProfile } from '../constants/const';
import bcrypt from 'bcrypt';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

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
    // required: true,
    default: defaultProfile.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    // required: true,
    default: defaultProfile.about,
  },
  avatar: {
    type: String,
    // required: true,
    default: defaultProfile.avatar,
    validate: (v: string) => validator.isURL(v),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (v: string) => validator.isEmail(v),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string): Promise<IUser | null> {
  return this.findOne({ email })
    .select("+password")
    .then((user: IUser | null) => {
      if (!user) {
        return Promise.reject(new Error("Неправильные почта или пароль"));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error("Неправильные почта или пароль"));
          }
          return user;
        });
    });
});

export default model<IUser, UserModel>('user', userSchema);
