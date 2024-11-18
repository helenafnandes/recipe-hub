import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Recipe[]> {
    const recipes = await this.recipeService.findAll();
    if (!recipes.length) {
      throw new NotFoundException('No recipes found');
    }
    return recipes;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeService.create(createRecipeDto);
  }
}
