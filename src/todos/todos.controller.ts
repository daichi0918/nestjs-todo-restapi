import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todosService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findById(Number(id));
  }

  @Post()
  async create(
    // @Body('id') id: number,
    // @Body('title') title: string,
    // @Body('content') content: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    // const todo: Todo = {
    //   id,
    //   title,
    //   content,
    // };
    return await this.todosService.create(createTodoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todosService.update(Number(id), createTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.todosService.delete(Number(id));
  }
}
