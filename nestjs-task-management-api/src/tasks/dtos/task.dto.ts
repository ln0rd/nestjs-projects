import { TaskStatus } from '../task.model';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}
