import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateTaskDto,
  GetTaskFilterDto,
  UpdateTaskDto,
} from './dtos/task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  // You can use @Body() body
  // You can use @Body('title') title, @Body('description') description
  @Post()
  createTask(@Body() creatTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(creatTaskDto);
  }

  // http://localhost:3000/tasks/76dfb4e1-041e-4ab5-9e96-ed1db207cc85
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    return this.taskService.updateTask(id, status);
  }
}
