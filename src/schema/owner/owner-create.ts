import Joi from 'joi';

export const ownerCreateBody = Joi.object().keys({
  name: Joi.string().required(),
  identity_document: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});
