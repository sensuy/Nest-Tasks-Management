import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

	constructor(private tasksSevice: TasksService) {}


	@Get()
	getAllTasks(): Task[] {
		return this.tasksSevice.getAllTasks();
	}

}
