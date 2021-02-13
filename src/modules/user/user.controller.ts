import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../entities';
import { UserService } from './user.service';

@Controller('/user')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userId')
  @ApiOperation({ summary: 'Get all info of a User based on its Id' })
  @ApiOkResponse({ description: 'All info of a User', type: User })
  async getUserInfoById(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<User> {
    return this.userService.getUserInfoById(userId);
  }
}