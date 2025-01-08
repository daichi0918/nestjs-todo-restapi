import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todos.model';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: number): Todo {
    const found = this.todos.find((todo) => todo.id === id);
    if (!found) throw new NotFoundException();
    return found;
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      ...createTodoDto,
    };
    this.todos.push(todo);
    return todo;
  }

  update(id: number, todo: Todo): Todo {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with id ${id} not found`);
    }

    // 更新対象のTodoを上書き
    this.todos[index] = { ...this.todos[index], ...todo };
    return this.todos[index];
  }

  delete(id: number) {
    const newTodo = this.todos.filter((todo) => todo.id !== id);
    this.todos = newTodo;
  }
}
