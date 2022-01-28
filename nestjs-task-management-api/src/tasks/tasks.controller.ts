import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dtos/task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  // You can use @Body() body
  // You can use @Body('title') title, @Body('description') description
  @Post()
  createTask(@Body() creatTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(creatTaskDto);
  }

  // http://localhost:3000/tasks/76dfb4e1-041e-4ab5-9e96-ed1db207cc85
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }
}
