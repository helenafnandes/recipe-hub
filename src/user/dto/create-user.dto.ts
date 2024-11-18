import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4, { message: 'Username must be at least 4 characters long.' })
  @MaxLength(20, { message: 'Username must not exceed 20 characters.' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Username must contain only alphanumeric characters.',
  })
  username: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long.' })
  password: string;
}
