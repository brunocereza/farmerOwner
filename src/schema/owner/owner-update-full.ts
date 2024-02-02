import Joi from 'joi';

export const updateFullOwnerBody = Joi.object()
  .keys({
    name: Joi.string().required(),
    identity_document: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  })
  .required();

export const updateFullOwnerParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
