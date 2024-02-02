import { Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { farmCreateBody } from '../../../schema/farm/farm-create';
import { IFarm } from '../../../interface/farm/farm-interface';
import { farmController } from '../../../controllers/farm/farm-controller';
import express = require('express');
import { getOneFarmParams } from '../../../schema/farm/farm-get-one';
import {
  updatePartialFarmBody,
  updatePartialFarmParams,
} from '../../../schema/farm/farm-update-partial';
import {
  updateFullFarmBody,
  updateFullFarmParams,
} from '../../../schema/farm/farm-update-full';
const farmRouth = Router();

//o esquema utilizado esta somente como exemplo, será ajustado e retirado
farmRouth.post(
  '/create',
  celebrate({ [Segments.BODY]: farmCreateBody }),
  async (req: express.Request, res: express.Response) => {
    try {
      const farmParams: IFarm = req.body;

      const farmCreated = await farmController.create(farmParams);

      console.log(farmCreated, 'farm ');

      return (
        res
          .status(201)
          //Ajustar para retornar alguns dados
          .json({ Message: 'farm has been created!' })
      );
    } catch (error) {
      // ajustar retorno
      return res.status(502).json({ message: 'Error processing the request' });
    }
  },
);

farmRouth.get(
  '/getAll',

  async (req, res) => {
    try {
      const farms = await farmController.getAll();

      if (farms) {
        return res.status(200).json({ farms });
      }
      return res.status(502).json({ message: 'Error processing the request' });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
  },
);

farmRouth.patch(
  '/:id',
  celebrate({ [Segments.BODY]: updatePartialFarmBody }),
  celebrate({ [Segments.PARAMS]: updatePartialFarmParams }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const farmChanges: Partial<IFarm> = req.body;

      await farmController.updatePartial(id, farmChanges);

      return res.status(200).json({ Message: 'farm updated successfully!' });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
  },
);

farmRouth.put(
  '/:id',
  celebrate({ [Segments.BODY]: updateFullFarmBody }),
  celebrate({ [Segments.PARAMS]: updateFullFarmParams }),
  async (req, res) => {
    try {
      const { id } = req.params;
      const farmChanges: IFarm = req.body;

      const update = await farmController.updateFull(id, farmChanges);

      return res.status(200).json({ Message: 'farm updated successfully!' });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
  },
);

farmRouth.get(
  '/get/:id',
  celebrate({ [Segments.PARAMS]: getOneFarmParams }),
  async (req, res) => {
    try {
      const { id } = req.params;

      const farm = await farmController.getById(id);

      return res.status(200).json({ Message: 'farm Search successful!', farm });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
  },
);

export default farmRouth;
