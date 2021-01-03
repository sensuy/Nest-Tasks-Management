import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { get } from 'http';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {

	constructor(private tasksSevice: TasksService) { }


	@Get()
	getAllTasks(): Task[] {
		return this.tasksSevice.getAllTasks();
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Task {
		return this.tasksSevice.getTaskById(id);
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksSevice.createTask(createTaskDto);
	}

	@Patch('/:id/status')
	updateTaskStatus(
		@Param('id') id: string,
		@Body('status') status: TaskStatus
	): Task {
		return this.tasksSevice.updateTaskStatus(id, status);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string) {
		return this.tasksSevice.deleteTask(id);
	}

}
