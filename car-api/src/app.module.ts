import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
