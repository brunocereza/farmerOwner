import Joi from 'joi';

export const owner = Joi.object().keys({
  name: Joi.string().required(),
  identityDocument: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});
