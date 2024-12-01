import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { User } from '../user/user.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(filters: { category?: number; page: number; limit: number; search?: string }): Promise<Recipe[]> {
    const { category, page, limit, search } = filters;
    const query = this.recipeRepository.createQueryBuilder('recipe');

    if (category) {
      query.andWhere('recipe.category = :category', { category });
    }

    if (search) {
      query.andWhere('recipe.name ILIKE :search', { search: `%${search}%` });
    }

    query.skip((page - 1) * limit).take(limit);
    return query.getMany();
  }

  async findByUser(userId: string): Promise<Recipe[]> {
    return this.recipeRepository.find({ where: { createdBy: { id: userId } } });
  }

  async create(createRecipeDto: CreateRecipeDto, userId: string): Promise<Recipe> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    console.log('Usuário encontrado:', user);
    const newRecipe = this.recipeRepository.create({
      ...createRecipeDto,
      createdBy: user,
    });

    return this.recipeRepository.save(newRecipe);
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto, userId: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id, createdBy: { id: userId } },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found or access denied.');
    }

    Object.assign(recipe, updateRecipeDto);

    return this.recipeRepository.save(recipe);
  }

  async softDelete(id: string, userId: string): Promise<void> {
    const recipe = await this.recipeRepository.findOne({
      where: { id, createdBy: { id: userId } },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found or access denied.');
    }

    await this.recipeRepository.softRemove(recipe);
  }
}
