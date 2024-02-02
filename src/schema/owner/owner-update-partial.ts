import Joi from 'joi';

export const updatePartialOwnerBody = Joi.object()
  .keys({
    name: Joi.string(),
    identity_document: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
  })
  .min(1);

export const updatePartialOwnerParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
