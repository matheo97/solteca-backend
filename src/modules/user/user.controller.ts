import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  async getUserInfoById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.userService.getUserInfoById(userId);
  }
}