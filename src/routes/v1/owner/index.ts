import { Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import { CreateOwner } from '../../../interface/owner/ownerInterface';
import { owner } from '../../../schema/owner/create';
import { ownerController } from '../../../controllers/owner/ownerController';

const ownerRouth = Router();

//o esquema utilizado esta somente como exemplo, será ajustado e retirado
ownerRouth.post(
  '/create',
  celebrate({ [Segments.BODY]: owner }),
  async (req, res) => {
    try {
      const params: CreateOwner = req.body;
      const createOwner = await ownerController.create(params);

      if (createOwner) {
        return res.status(200).json({ Message: createOwner });
      }
      return res
        .status(502)
        .json({ message: 'Erro ao processar a requisição' });
    } catch (error) {
      throw error;
    }
  },
);

ownerRouth.get('/getAll', async (req, res) => {
  try {
    const owners = await ownerController.getAll();
    console.log(owners);

    if (owners) {
      return res.status(200).json({ owners });
    }
    return res.status(502).json({ message: 'Erro ao processar a requisição' });
  } catch (error) {
    throw error;
  }
});

export default ownerRouth;
