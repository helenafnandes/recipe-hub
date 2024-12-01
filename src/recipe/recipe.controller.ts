import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.decorator';
import { User as UserEntity } from '../user/user.entity';

@Controller('recipes')
@UseGuards(AuthGuard('jwt'))
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async findAll(
    @Query('category') category?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Recipe[]> {
    return this.recipeService.findAll({ category, page, limit });
  }

  @Post()
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @User() user: UserEntity,
  ): Promise<Recipe> {
    return this.recipeService.create(createRecipeDto, user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @User() user: UserEntity,
  ): Promise<Recipe> {
    return this.recipeService.update(id, updateRecipeDto, user.id);
  }

  @Delete(':id')
  async softDelete(@Param('id') id: string, @User() user: UserEntity): Promise<void> {
    return this.recipeService.softDelete(id, user.id);
  }
}
