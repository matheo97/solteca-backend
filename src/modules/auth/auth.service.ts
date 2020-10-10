import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByEmail(username);
    if (user && compareSync(pass, user.password)) {
      delete user.password;
      return {
        userId: user.id,
        username: user.email,
      };
    }
    return new UnauthorizedException(401, 'The email or password you entered is incorrect.');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}