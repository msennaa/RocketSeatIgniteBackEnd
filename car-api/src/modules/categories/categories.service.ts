import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories.entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async createCategories(body: any) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { name: body.name },
      });

      if (category) {
        throw new BadRequestException('Category already registered');
      }
      this.logger.log('Category successfully created.');
      return await this.categoriesRepository.save(body);
    } catch (error) {
      this.logger.error(`Failed to create users. Error: ${error.message}.`);
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
