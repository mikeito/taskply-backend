import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/config/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    // return req.user; // Access the authenticated user
    console.log('DTO ', createTaskDto);
    console.log('Auth user::: ', req.user);
    
    return await this.taskService.create(createTaskDto, req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateTaskDto: UpdateTaskDto, 
    @Request() req
  ) {
    return this.taskService.update(+id, updateTaskDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log('Deleting::: ', id);
    
    return this.taskService.remove(+id);
  }
}
