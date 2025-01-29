import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  // UseGuards, // Comentado para deshabilitar la validación de token
} from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Comentado para deshabilitar la validación de token

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @UseGuards(JwtAuthGuard) // Comentado para deshabilitar la validación de token
  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: Task })
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task);
  }

  // @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: Task })
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
