import { IsNotEmpty, IsArray, IsString, ArrayMinSize, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecipeDto {
  @ApiProperty({ description: 'The name of the recipe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The ingredients of the recipe', type: [String] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one ingredient is required.' })
  ingredients: string[];

  @ApiProperty({ description: 'The preparation method of the recipe' })
  @IsNotEmpty()
  @IsString()
  preparationMethod: string;

  @ApiProperty({ description: 'The image of the recipe', required: false })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ description: 'The category of the recipe' })
  @IsNotEmpty()
  @IsNumber()
  category: number;
}
