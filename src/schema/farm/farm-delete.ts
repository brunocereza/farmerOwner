import Joi from 'joi';

export const deleteFarmParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
