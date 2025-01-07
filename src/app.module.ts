import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';

@Module({
  // モジュール内部で必要な外部モジュールを記述
  imports: [TodosModule],
  controllers: [],
  providers: [],

  // exports: 外部のモジュールにエクスポートしたいものを記述
})
export class AppModule {}
