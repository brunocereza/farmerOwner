import Joi from 'joi';

export const getOneOwnerParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
