import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) {}
  private todos: Todo[] = [];
  async findAll(userId: number): Promise<Todo[]> {
    return await this.prismaService.todo.findMany({
      where: {
        userId,
      },
    });
  }

  async findById(id: number): Promise<Todo> {
    const found = await this.prismaService.todo.findUnique({
      where: {
        id,
      },
    });
    if (!found) throw new NotFoundException();
    return found;
  }

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
    // const todo: Todo = {
    //   ...createTodoDto,
    // };
    // this.todos.push(todo);
    // return todo;
    const { title, content } = createTodoDto;
    return await this.prismaService.todo.create({
      data: {
        title,
        content,
        userId,
      },
    });
  }

  async update(id: number, todo: CreateTodoDto): Promise<Todo> {
    const { title, content } = todo;
    return await this.prismaService.todo.update({
      data: {
        title,
        content,
      },
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    await this.prismaService.todo.delete({
      where: { id },
    });
  }
}
