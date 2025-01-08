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
import { Todo } from './todos.model';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Todo {
    return this.todosService.findById(Number(id));
  }

  @Post()
  create(
    // @Body('id') id: number,
    // @Body('title') title: string,
    // @Body('content') content: string,
    @Body() createTodoDto: CreateTodoDto,
  ): Todo {
    // const todo: Todo = {
    //   id,
    //   title,
    //   content,
    // };
    return this.todosService.create(createTodoDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): Todo {
    const NumId = Number(id);
    const todo: Todo = {
      id: NumId,
      title,
      content,
    };
    return this.todosService.update(NumId, todo);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosService.delete(Number(id));
  }
}
