import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entities';
import { updateAccountDto } from './dto/updateAccount.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private usersRepostitory: Repository<User>,
  ) {}

  async getAllUsers(paginate: IPaginationOptions) {
    try {
      const users = this.usersRepostitory
        .createQueryBuilder('user')
        .select('*');

      return await paginateRaw(users, paginate);
    } catch (error) {
      this.logger.error(`Failed to get all users. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async createUsers(body: any) {
    try {
      const userAlreadyExists = await this.usersRepostitory.findOne({
        where: [{ email: body.email }, { cpf: body.cpf }],
      });

      if (userAlreadyExists) {
        throw new BadRequestException('User already exists');
      }

      return await this.usersRepostitory.save(body);
    } catch (error) {
      this.logger.error(`Failed to create users. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async depositValue(body: any, userCpf: string) {
    try {
      const alreadyExists = await this.usersRepostitory.findOne({
        where: { cpf: userCpf },
      });

      if (!alreadyExists) {
        throw new NotFoundException('User not found');
      }

      const { description, amount } = body;

      alreadyExists.amount = alreadyExists.amount + amount;

      const statement = [
        ...alreadyExists.statement,
        {
          description,
          amount,
          createdAt: new Date(),
          type: 'credit',
        },
      ];

      return await this.usersRepostitory.save({ ...alreadyExists, statement });
    } catch (error) {
      this.logger.error(`Failed to deposit value. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async withdrawValue(body: any, userCpf: string) {
    try {
      const { amount, description } = body;

      const alreadyExists = await this.usersRepostitory.findOne({
        where: { cpf: userCpf },
      });

      if (!alreadyExists) {
        throw new NotFoundException('User not found');
      }

      if (amount > alreadyExists.amount) {
        throw new BadRequestException('Insufficient funds');
      }

      alreadyExists.amount = alreadyExists.amount - amount;

      const statement = [
        ...alreadyExists.statement,
        {
          description,
          amount,
          createdAt: new Date(),
          type: 'debit',
        },
      ];

      return await this.usersRepostitory.save({ ...alreadyExists, statement });
    } catch (error) {
      this.logger.error(`Failed to withdraw value. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getStatementByDate(userCpf: string, query: any) {
    try {
      const alreadyExists = await this.usersRepostitory.findOne({
        where: { cpf: userCpf },
      });

      if (!alreadyExists) {
        throw new NotFoundException('User not found');
      }

      const formatedDate = new Date(query.date + ' 00:00');

      const { user_statement } = await this.usersRepostitory
        .createQueryBuilder('user')
        .select('user.statement')
        .where('user.id = :id', { id: alreadyExists.id })
        .getRawOne();

      const getStatementByDate = user_statement.filter((statement: any) => {
        return (
          new Date(statement.createdAt).toDateString() ==
          new Date(formatedDate).toDateString()
        );
      });

      return getStatementByDate;
    } catch (error) {
      this.logger.error(`Failed get users statement. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async updateAccount(userCpf: string, body: updateAccountDto) {
    try {
      const alreadyExists = await this.usersRepostitory.findOne({
        where: { cpf: userCpf },
      });

      if (!alreadyExists) {
        throw new NotFoundException('User not found');
      }

      return await this.usersRepostitory.save({ ...alreadyExists, ...body });
    } catch (error) {
      this.logger.error(`Failed to update account. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async deleteAccount(userCpf: string) {
    try {
      const alreadyExists = await this.usersRepostitory.findOne({
        where: { cpf: userCpf },
      });

      if (!alreadyExists) {
        throw new NotFoundException('User not found');
      }

      await this.usersRepostitory.delete(alreadyExists.id);
      return { message: 'User deleted' };
    } catch (error) {
      this.logger.error(`Failed to delete account. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async getStatement(userCpf: string, filter?: string) {
    try {
      const alreadyExists = await this.usersRepostitory.findOne({
        where: { cpf: userCpf },
      });

      if (!alreadyExists) {
        throw new NotFoundException('User not found');
      }

      if (filter) {
        const customStatement = alreadyExists.statement.filter(
          (element: any) => element.type == filter,
        );

        return customStatement;
      }

      return alreadyExists.statement;
    } catch (error) {
      this.logger.error(
        `Failed to getStatement account. Error: ${error.message}.`,
      );
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
