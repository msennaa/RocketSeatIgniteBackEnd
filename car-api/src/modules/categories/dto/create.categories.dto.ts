import { IsLowercase, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriesDto {
  @IsString()
  @IsNotEmpty()
  @IsLowercase()
  name: string;
}
