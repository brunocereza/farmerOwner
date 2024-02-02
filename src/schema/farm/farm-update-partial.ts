import Joi from 'joi';
import { CropsTypes } from '../../core/enum/crops-types';

export const updatePartialFarmBody = Joi.object()
  .keys({
    name: Joi.string(),
    ownerId: Joi.string().guid(),
    city: Joi.string(),
    state: Joi.string(),
    arable_area: Joi.number(),
    total_area: Joi.number(),
    crops_types: Joi.array()
      .items(Joi.string().valid(...Object.values(CropsTypes)))
      .min(1),
    vegetation_area: Joi.number(),
  })
  .min(1);

export const updatePartialFarmParams = Joi.object().keys({
  id: Joi.string().guid().required(),
});
