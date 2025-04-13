import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber(undefined)
  phoneNumber: string;
}
