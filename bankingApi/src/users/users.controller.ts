import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UserDto } from '../users/dto/user.dto';
import { OperationUserDto } from './dto/depositUser.dto';
import { updateAccountDto } from './dto/updateAccount.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  async createUser(@Body() body: UserDto): Promise<any> {
    return await this.usersService.createUsers(body);
  }

  @Post('deposit/:cpf')
  async depositValue(
    @Body() body: OperationUserDto,
    @Param('cpf') cpf: string,
  ) {
    return await this.usersService.depositValue(body, cpf);
  }

  @Post('withdraw/:cpf')
  async withdrawValue(
    @Body() body: OperationUserDto,
    @Param('cpf') cpf: string,
  ) {
    return await this.usersService.withdrawValue(body, cpf);
  }

  @Get('statements/:cpf')
  async statementUserByDate(
    @Param('cpf') cpf: string,
    @Query() query: any,
  ): Promise<any> {
    return await this.usersService.getStatementByDate(cpf, query);
  }

  @Post('account/:cpf')
  async updateAccount(
    @Body() body: updateAccountDto,
    @Param('cpf') cpf: string,
  ) {
    return await this.usersService.updateAccount(cpf, body);
  }

  @Get('')
  async getAllUsers(@Query() option: IPaginationOptions) {
    return await this.usersService.getAllUsers(option);
  }

  @Delete('account/:cpf')
  async deleteAccount(@Param('cpf') cpf: string) {
    return await this.usersService.deleteAccount(cpf);
  }

  @Get('statement/:cpf')
  async getCreditStatement(
    @Param('cpf') cpf: string,
    @Query('status') filter: string,
  ) {
    return await this.usersService.getStatement(cpf, filter);
  }
}
