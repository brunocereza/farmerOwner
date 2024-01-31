import { Router } from 'express';
import ownerRouth from './owner';

const routesV1 = Router();

routesV1.use('/owner', ownerRouth);

export default routesV1;
