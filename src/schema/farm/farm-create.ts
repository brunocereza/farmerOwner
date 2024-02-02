import Joi from 'joi';
import { CropsTypes } from '../../core/enum/crops-types';

export const farmCreateBody = Joi.object().keys({
  name: Joi.string().required(),
  ownerId: Joi.string().guid().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  arable_area: Joi.number().required(),
  total_area: Joi.number().required(),
  crops_types: Joi.array()
    .items(Joi.string().valid(...Object.values(CropsTypes)))
    .min(1)
    .required(),
  vegetation_area: Joi.number().required(),
});
