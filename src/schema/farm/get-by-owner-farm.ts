import Joi from 'joi';

export const getByOwnerFarmParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
