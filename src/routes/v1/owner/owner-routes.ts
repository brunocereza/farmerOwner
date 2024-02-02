import { Segments, celebrate } from 'celebrate';
import { Router, response } from 'express';
import { IOwner } from '../../../interface/owner/owner-interface';
import { ownerCreateBody } from '../../../schema/owner/owner-create';
import { ownerController } from '../../../controllers/owner/owner-controller';
import {
  updatePartialOwnerBody,
  updatePartialOwnerParams,
} from '../../../schema/owner/owner-update-partial';
import {
  updateFullOwnerBody,
  updateFullOwnerParams,
} from '../../../schema/owner/owner-update-full';
import { getOneOwnerParams } from '../../../schema/owner/owner-get-one';
import express = require('express');
import { farmController } from '../../../controllers/farm/farm-controller';
const ownerRouth = Router();

//o esquema utilizado esta somente como exemplo, será ajustado e retirado
ownerRouth.post(
  '/create',
  celebrate({ [Segments.BODY]: ownerCreateBody }),
  async (req: express.Request, res: express.Response) => {
    try {
      const params: IOwner = req.body;
      const ownerCreated = await ownerController.create(params);

      if (ownerCreated) {
        return (
          res
            .status(201)
            //Ajustar para retornar alguns dados
            .json({ Message: 'Ownert has been created!' })
        );
      }
      return res.status(502).json({ message: 'Error processing the request' });
    } catch (error) {
      throw error;
    }
  },
);

ownerRouth.get(
  '/getAll',
  async (req: express.Request, res: express.Response) => {
    try {
      const owners = await ownerController.getAll();

      if (owners) {
        return res.status(200).json({ owners });
      }
    } catch (error) {
      // ajustar retorno
      return res.status(502).json({ message: 'Error processing the request' });
    }
  },
);

ownerRouth.patch(
  '/:id',
  celebrate({ [Segments.BODY]: updatePartialOwnerBody }),
  celebrate({ [Segments.PARAMS]: updatePartialOwnerParams }),
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const ownerChanges: Partial<IOwner> = req.body;

      const update = await ownerController.updatePartial(id, ownerChanges);

      return res.status(200).json({ Message: 'Owner updated successfully!' });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
  },
);

ownerRouth.put(
  '/:id',
  celebrate({ [Segments.BODY]: updateFullOwnerBody }),
  celebrate({ [Segments.PARAMS]: updateFullOwnerParams }),
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const ownerChanges: IOwner = req.body;

      await ownerController.updateFull(id, ownerChanges);

      return res.status(200).json({ Message: 'Owner updated successfully!' });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
  },
);

ownerRouth.get(
  '/get/:id',
  celebrate({ [Segments.PARAMS]: getOneOwnerParams }),
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      const owner = await ownerController.getById(id);

      return res
        .status(200)
        .json({ Message: 'Owner Search successful!', owner });
    } catch (error) {
      res.status(error.status).send({
        message: error.message,
        name: error.name,
        status: error.status,
      });
    }
  },
);

export default ownerRouth;
