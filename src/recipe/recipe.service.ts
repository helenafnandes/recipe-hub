import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const { name, ingredients, preparationMethod, rating, numberOfRatings } = createRecipeDto;

    const newRecipe = this.recipeRepository.create({
      name,
      ingredients,
      preparationMethod,
      rating,
      numberOfRatings,
    });

    return this.recipeRepository.save(newRecipe);
  }
}
