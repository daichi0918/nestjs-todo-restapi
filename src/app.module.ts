import { Module } from '@nestjs/common';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  // モジュール内部で必要な外部モジュールを記述
  imports: [TodosModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],

  // exports: 外部のモジュールにエクスポートしたいものを記述
})
export class AppModule {}
