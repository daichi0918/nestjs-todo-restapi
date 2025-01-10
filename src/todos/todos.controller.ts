import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'types/requestUser';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Request() req: ExpressRequest & { user: RequestUser },
  ): Promise<Todo[]> {
    return await this.todosService.findAll(req.user.userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findById(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Request() req: ExpressRequest & { user: RequestUser },
  ): Promise<Todo> {
    return await this.todosService.create(createTodoDto, req.user.userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.update(Number(id), createTodoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string) {
    return await this.todosService.delete(Number(id));
  }
}
