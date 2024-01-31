import { Router } from 'express';
import routesV1 from './v1';

const routes = Router();

routes.use('/v1', routesV1);

export default routes;
