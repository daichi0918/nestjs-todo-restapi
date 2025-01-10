import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { CredentialsDto } from './dto/credentials.dto';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'types/requestUser';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @Post('signin')
  async signIn(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentialsDto);
  }

  @Post('authentication')
  @UseGuards(AuthGuard('jwt'))
  async authentication(@Request() req: ExpressRequest & { user: RequestUser }) {
    return await this.authService.authCheck(req.user.userId);
  }
}
