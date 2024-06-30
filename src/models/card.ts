import validator from 'validator';

import {
  Schema,
  model,
  Date,
  ObjectId,
} from 'mongoose';

type TCard = {
  name: string;
  link: string;
  owner: ObjectId;
  likes: ObjectId[];
  createdAt: Date;
};

const cardSchema = new Schema<TCard>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    link: {
      type: String,
      required: true,
      validate: (v: string) => validator.isURL(v),
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

export default model<TCard>('card', cardSchema);
