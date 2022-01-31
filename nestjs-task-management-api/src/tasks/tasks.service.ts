import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto, GetTaskFilterDto } from './dtos/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(creatTaskDto: CreateTaskDto): Task {
    const { title, description } = creatTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temporary array to hold the result
    let tasksFiltered = this.getAllTasks();

    // do something with status
    if (status) {
      tasksFiltered = tasksFiltered.filter((task) => task.status == status);
    }

    // do something with search
    if (search) {
      tasksFiltered = tasksFiltered.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    // return final result
    return tasksFiltered;
  }

  getTaskById(id: string): Task {
    // try to get task
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    // Attr by reference
    task.status = status;
    return task;
  }
}
