import { IsNumber, IsString } from 'class-validator';

export class OperationUserDto {
  @IsString()
  description: string;

  @IsNumber()
  amount: number;
}
