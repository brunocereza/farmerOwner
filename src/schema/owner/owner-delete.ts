import Joi from 'joi';

export const deleteOwnerParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
