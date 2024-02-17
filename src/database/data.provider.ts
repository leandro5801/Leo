import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Environment from 'common/enum/enviorenment.enum';
import { ConnectOptions, ConnectionOptions } from 'typeorm';

const DataProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const isDevelopmentEnvironment =
      config.get('NODE_ENV') === Environment.Development;

    const db = {
      type: 'postgres',
      host: config.get('HOST_DB'),
      port: config.get('PORT_DB'), 
      username: config.get('USER_DB'),
      password: config.get('PASSWORD_DB'),
      database: config.get('DB'),
      loggin: config.get('LOGGING_DB'),
      autoLoadEntities: true,
      synchronize: isDevelopmentEnvironment,
    } as ConnectOptions;
    return db;
  },
});
export default DataProvider;
