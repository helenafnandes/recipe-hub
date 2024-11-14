import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeModule } from './recipes/recipe.module';
import { Recipe } from './recipes/recipe.entity';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Recipe],
      synchronize: true, // dev
      schema: 'recipes', // Esquema onde as tabelas serão criadas
    }),    
    RecipeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
