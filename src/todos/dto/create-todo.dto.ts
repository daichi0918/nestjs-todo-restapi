import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsNotEmpty()
  // @MaxLength(1000)
  content: string;
}
