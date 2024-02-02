import { Router } from 'express';
import routesV1 from './v1/v1-routes';

const routes = Router();

routes.use('/v1', routesV1);

export default routes;
