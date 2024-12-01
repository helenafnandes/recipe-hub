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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('recipes')
@UseGuards(AuthGuard('jwt'))
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  @ApiOperation({ summary: 'Get all recipes' })
  async findAll(
    @Query('category') category?: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('search') search?: string,
  ): Promise<Recipe[]> {
    return this.recipeService.findAll({ category, page, limit, search });
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get recipes by user ID' })
  async findByUser(@Param('userId') userId: string): Promise<Recipe[]> {
    return this.recipeService.findByUser(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new recipe' })
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @User() user: UserEntity, 
  ): Promise<Recipe> {
    console.log('Usuário autenticado no POST:', user);
    return this.recipeService.create(createRecipeDto, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recipe' })
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @User() user: UserEntity,
  ): Promise<Recipe> {
    return this.recipeService.update(id, updateRecipeDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a recipe' })
  async softDelete(@Param('id') id: string, @User() user: UserEntity): Promise<void> {
    return this.recipeService.softDelete(id, user.id);
  }
}
