import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('tasks') // Etiqueta para agrupar los endpoints en Swagger
@Controller('tasks')
@ApiBearerAuth() // Añade autenticación con Bearer JWT a todos los endpoints del controlador
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard) // Protege el endpoint con JWT
  @Get()
  @ApiOperation({
    summary: 'Obtener todas las tareas',
    description: 'Devuelve una lista de todas las tareas.',
  })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una tarea por ID',
    description: 'Devuelve una única tarea basada en su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la tarea a obtener',
    type: Number,
  })
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({
    summary: 'Crear una nueva tarea',
    description: 'Crea una nueva tarea y la guarda en la base de datos.',
  })
  @ApiBody({ type: Task, description: 'Datos de la nueva tarea' })
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar una tarea existente',
    description: 'Actualiza una tarea existente basada en su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la tarea a actualizar',
    type: Number,
  })
  @ApiBody({ type: Task, description: 'Datos actualizados de la tarea' })
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.update(id, task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una tarea existente',
    description: 'Elimina una tarea existente basada en su ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la tarea a eliminar',
    type: Number,
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
