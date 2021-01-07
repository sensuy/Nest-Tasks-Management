import { CreateTaskDto } from './dto/create-task.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {

	constructor(private tasksSevice: TasksService) { }


	@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
		if (Object.keys(filterDto).length) {
			return this.tasksSevice.getTasksWithFilters(filterDto)
		}
		return this.tasksSevice.getAllTasks();
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Task {
		return this.tasksSevice.getTaskById(id);
	}

	@Post()
	@UsePipes(ValidationPipe)
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksSevice.createTask(createTaskDto);
	}

	@Patch('/:id/status')
	updateTaskStatus(
		@Param('id') id: string,
		@Body('status', TaskStatusValidationPipe) status: TaskStatus
	): Task {
		return this.tasksSevice.updateTaskStatus(id, status);
	}

	@Delete('/:id')
	deleteTask(@Param('id') id: string) {
		return this.tasksSevice.deleteTask(id);
	}

}
