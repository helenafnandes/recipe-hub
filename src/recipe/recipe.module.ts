import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    UserModule, 
  ],
  providers: [RecipeService],
  controllers: [RecipeController],
  exports: [RecipeService],
})
export class RecipeModule {}
