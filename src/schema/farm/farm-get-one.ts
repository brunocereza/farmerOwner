import Joi from 'joi';

export const getOneFarmParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
