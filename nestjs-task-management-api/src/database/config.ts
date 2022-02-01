import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nestjs',
  //create the entities for you
  autoLoadEntities: true,
  //keep your schemas in database updated with your entities
  synchronize: true,
});

export { typeOrmModule };
