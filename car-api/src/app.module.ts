import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import config from 'ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
