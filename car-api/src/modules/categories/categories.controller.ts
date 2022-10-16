import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDto } from './dto/create.categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() body: CreateCategoriesDto) {
    return await this.categoriesService.createCategories(body);
  }

  @Get()
  async getCategoriesPaginated(@Query() option: IPaginationOptions) {
    return await this.categoriesService.getCategoriesPaginated(option);
  }
}
