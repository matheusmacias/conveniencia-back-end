import { Sequelize } from 'sequelize';

import config from './config.json';

type Environment = 'development' | 'production' | 'test';

const env: Environment = (process.env.NODE_ENV as Environment) || 'development';
const envConfig = config[env];

function createSequelizeInstance(config: any) {
    const { database, username, password, host, dialect } = config;
    return new Sequelize(database, username, password, { host, dialect });
}
  

const sequelize = createSequelizeInstance(envConfig);

export default sequelize;