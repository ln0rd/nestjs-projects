import { Module } from '@nestjs/common';
import { typeOrmModule } from './database/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule, typeOrmModule],
})
export class AppModule {}
