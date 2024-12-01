import { IsNotEmpty, IsArray, IsString, ArrayMinSize, IsOptional, IsNumber } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one ingredient is required.' })
  ingredients: string[];

  @IsNotEmpty()
  @IsString()
  preparationMethod: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;
}
