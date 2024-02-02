import { Router } from 'express';
import ownerRouth from './owner/owner-routes';
import farmRouth from './farm/farm-routes';

const routesV1 = Router();

routesV1.use('/owner', ownerRouth);
routesV1.use('/farm', farmRouth);

export default routesV1;
