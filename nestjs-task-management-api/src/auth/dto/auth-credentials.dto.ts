import { IsNotEmpty, IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
