import { Controller, Get, Post, Body, UseGuards, NotFoundException, BadRequestException } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { AuthGuard } from '@nestjs/passport';

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
  async create(@Body() recipe: Partial<Recipe>): Promise<Recipe> {
    if (!recipe.name || !recipe.description) {
      throw new BadRequestException('Recipe title and ingredients are required');
    }
    return this.recipeService.create(recipe);
  }
}
