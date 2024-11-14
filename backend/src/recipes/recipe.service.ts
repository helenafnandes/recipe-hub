import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async create(recipe: Partial<Recipe>): Promise<Recipe> {
    if (!recipe.name || !recipe.description) {
      throw new BadRequestException('Name and description are required.');
    }

    const newRecipe = this.recipeRepository.create(recipe);
    return this.recipeRepository.save(newRecipe);
  }
}
