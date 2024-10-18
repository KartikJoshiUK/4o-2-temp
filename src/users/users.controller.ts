import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('profile')
  @Roles('admin')
  async updateProfile(
    @Request() req,
    @Body() body: { username: string; password: string },
  ): Promise<any> {
    return this.usersService.updateProfile(
      req.user.userId,
      body.username,
      body.password,
    );
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('all')
  async getAllUsers(@Request() req): Promise<any> {
    return this.usersService.findAll();
  }
}
