import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtPayload } from 'types/jwtPayload';
import { ResponseUserType } from 'src/interfaces/User';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { name, email, password } = createUserDto;

    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!!user) {
      throw new UnauthorizedException(
        `${email} は別のアカウントで使用されています。`,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const resUser: ResponseUserType = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updateAt: createdUser.updateAt,
    };

    const payload: JwtPayload = {
      sub: createdUser.id,
      username: createdUser.name,
    };
    return {
      user: resUser,
      accessToken: this.jwtService.sign(payload),
    };
  }
  async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const { email, password } = credentialsDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = {
        sub: user.id,
        username: user.name,
      };
      const token = this.jwtService.sign(payload);
      return { token };
    }

    throw new UnauthorizedException();
  }

  async authCheck(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('認証データが存在しません');

    const resUser: ResponseUserType = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updateAt: user.updateAt,
    };

    const payload: JwtPayload = {
      sub: user.id,
      username: user.name,
    };

    return {
      user: resUser,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
