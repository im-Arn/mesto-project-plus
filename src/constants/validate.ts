import { celebrate, Joi } from 'celebrate';

export const urlRegExpr = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

// createUser
export const valUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegExpr),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
// loginUser
export const valLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
// updateUser
export const valUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
  }),
});
// valUpdateAvatar
export const valUpdateAvatar = celebrate({ body: Joi.object().keys({ avatar: Joi.string().pattern(urlRegExpr).required() }) });
// createCard
export const valCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegExpr).required(),
  }),
});
// deleteCard
// eslint-disable-next-line
export const valCardId = celebrate({ params: Joi.object().keys({ cardId: Joi.string().length(24).hex().required() }), });
// getUser
export const valUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
      .required(),
  }),
});
