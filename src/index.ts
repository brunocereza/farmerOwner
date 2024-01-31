import { errors } from 'celebrate';
import cors from 'cors';

import { config } from 'dotenv';

config();

import express, { json } from 'express';
import routes from './routes';

const port = process.env.PORT || '3333';
const app = express();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(json());
app.use(routes);
app.use(errors());
app.listen(port, async () => {
  try {
    console.log(`🚀 Server running on port: ${port}`);
  } catch (error) {
    console.log('⚠️ Error running server', error);
  }
});
