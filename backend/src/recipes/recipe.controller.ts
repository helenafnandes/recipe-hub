import { Controller, Get, Post, Body } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // Rota GET para listar todas as receitas
  @Get()
  async findAll(): Promise<Recipe[]> {
    return this.recipeService.findAll();
  }

  // Rota POST para adicionar uma nova receita
  @Post()
  async create(@Body() recipe: Partial<Recipe>): Promise<Recipe> {
    return this.recipeService.create(recipe);
  }
}
