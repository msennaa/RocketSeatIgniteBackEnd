import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  cpf: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  name: string;
}
