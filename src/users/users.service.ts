import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class UsersService {
  constructor() {
    console.log('UsersService constructor');
  }
  private users: User[] = [];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(username: string, password: string, role: string) {
    const userId = this.users.length + 1;
    const newUser = { userId, username, password, role };
    this.users.push(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async updateProfile(userId: number, username: string, password: string) {
    const user = this.users.find((u) => u.userId === userId);
    if (user) {
      user.username = username;
      user.password = await bcrypt.hash(password, 10);
      return user;
    }
    return null;
  }
}
