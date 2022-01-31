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
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    // if we have some filter I will call taskServices.getTasksWithFilter
    // otherwise, just get all
    if (Object.keys(filterDto).length) {
      return this.taskService.getTaskWithFilters(filterDto);
    }

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

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    const { status } = updateTaskDto;
    return this.taskService.updateTask(id, status);
  }
}
