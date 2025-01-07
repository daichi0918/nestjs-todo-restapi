import { Injectable } from '@nestjs/common';
import { Todo } from './todos.model';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: number): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  create(todo: Todo): Todo {
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
