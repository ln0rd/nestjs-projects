import { Module } from '@nestjs/common';
import { typeOrmModule } from './database/config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, typeOrmModule, AuthModule],
})
export class AppModule {}
