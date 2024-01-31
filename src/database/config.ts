import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {} from '../';
const { HOST, DATABASE, USER, PASSWORD } = process.env;

//Utilizado o SCHEMA como parametro caso seja multischema
export const configureConnection = (): DataSource => {
  const dataSourceSettings: PostgresConnectionOptions = {
    type: 'postgres',
    host: HOST,
    port: 5432,
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    schema: 'public',
    entities: ['src/entities/**/*.ts'],
    synchronize: false, //IMPORTANTÍSSIMO DEIXAR FALSE - se deixar on ele irá criar as tabelas com o nome de cada @Entity('EXEMPLO')
  };
  const dbaConnection = new DataSource(dataSourceSettings);

  return dbaConnection;
};
