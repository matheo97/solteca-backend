// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE,
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'typeorm_migrations',
  migrations: ['db/migrations/*.ts'],
  entities: [__dirname + '/dist/src/modules/entities/*.entity{.ts,.js}'],
  cli: {
    migrationsDir: 'db/migrations',
  }
}