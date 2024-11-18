import { IsNotEmpty, IsArray, IsString, ArrayMinSize, Min, Max } from 'class-validator';

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

  @Min(0)
  @Max(5)
  rating: number = 0;

  @Min(0)
  numberOfRatings: number = 0;
}
