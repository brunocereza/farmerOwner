import { Segments, celebrate } from 'celebrate';
import { Router, response } from 'express';
import { IOwner } from '../../../interface/owner/owner-interface';
import { ownerBody } from '../../../schema/owner/create';
import { ownerController } from '../../../controllers/owner/ownerController';
import {
  updatePartialOwnerBody,
  updatePartialOwnerParams,
} from '../../../schema/owner/updatePartial';
import {
  updateFullOwnerBody,
  updateFullOwnerParams,
} from '../../../schema/owner/updateFull';
const ownerRouth = Router();

//o esquema utilizado esta somente como exemplo, será ajustado e retirado
ownerRouth.post(
  '/create',
  celebrate({ [Segments.BODY]: ownerBody }),
  async (req, res) => {
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

  async (req, res) => {
    try {
      const owners = await ownerController.getAll();

      if (owners) {
        return res.status(200).json({ owners });
      }
      return res.status(502).json({ message: 'Error processing the request' });
    } catch (error) {
      throw error;
    }
  },
);

ownerRouth.patch(
  '/:id',
  celebrate({ [Segments.BODY]: updatePartialOwnerBody }),
  celebrate({ [Segments.PARAMS]: updatePartialOwnerParams }),
  async (req, res) => {
    try {
      const id = req.params.id;
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
  async (req, res) => {
    try {
      const id = req.params.id;
      const ownerChanges: IOwner = req.body;

      const update = await ownerController.updateFull(id, ownerChanges);

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

export default ownerRouth;
