import { IsOptional, IsString } from 'class-validator';

export class updateAccountDto {
  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  name: string;
}
