import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'types/requestUser';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          default: 'test@gmail.com',
        },
        password: {
          type: 'string',
          default: 'test',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'todo一覧',
    content: {
      'application/json': {
        example: [
          {
            id: 7,
            title: 'Todo5',
            content: 'Todo5 content',
            createdAt: '2025-01-09T01:56:41.000Z',
            updateAt: '2025-01-09T01:56:41.000Z',
            userId: 5,
          },
          {
            id: 9,
            title: 'Todo10',
            content: 'Todo10 content',
            createdAt: '2025-01-10T00:41:31.000Z',
            updateAt: '2025-01-10T00:41:31.000Z',
            userId: 5,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'todo一覧',
    content: {
      'application/json': {
        example: [
          {
            message: 'Unauthorized',
            statusCode: 401,
          },
        ],
      },
    },
  })
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
