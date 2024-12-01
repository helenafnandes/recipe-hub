import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty({ description: 'The name of the recipe', required: false })
  name?: string;

  @ApiProperty({ description: 'The ingredients of the recipe', type: [String], required: false })
  ingredients?: string[];

  @ApiProperty({ description: 'The preparation method of the recipe', required: false })
  preparationMethod?: string;

  @ApiProperty({ description: 'The image of the recipe', required: false })
  image?: string;

  @ApiProperty({ description: 'The category of the recipe', required: false })
  category?: number;
}
