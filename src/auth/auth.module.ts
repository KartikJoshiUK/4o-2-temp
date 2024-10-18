import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret', // Replace with a proper secret in production
      signOptions: { expiresIn: '60m' }, // Token expiration time
    }),
    UsersModule, // Importing users module for user data
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
