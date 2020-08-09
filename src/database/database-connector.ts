import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { EnvConfig } from '../config/env-config';

export class DatabaseConnector {
  constructor(private readonly envConfig: EnvConfig) {}

  async connect() {
    await createConnection(this.getConnOptions());
    console.info('Connect to mysql successfully.');
  }

  async disconnect() {
    await getConnection().close();
    console.info('Disconnect from mysql successfully.');
  }

  private getConnOptions() {
    const config = this.envConfig.getEnvConfig();
    const options: ConnectionOptions = {
      type: 'mysql',
      entities: [__dirname + '/entity/*.entity{.ts,.js}'],
      host: config.MYSQL_HOST,
      port: config.MYSQL_PORT,
      username: config.MYSQL_USER_ID,
      password: config.MYSQL_PASSWORD,
      database: config.MYSQL_DATABASE,
      timezone: 'Z',
      synchronize: true
    };

    return options;
  }
}
