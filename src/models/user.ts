import { model, Schema, Model, Document } from 'mongoose';
import validator from 'validator';
import { defaultProfile } from '../constants/const';

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

export default model<IUser>('user', userSchema);
