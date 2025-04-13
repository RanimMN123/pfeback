
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // Créer une catégorie
  @Post('test/categories')
  async createCategory(@Body('name') name: string) {
    return await this.categoryService.createCategory({ name });
  }
  // Obtenir toutes les catégories
  @Get()
  async getCategories() {
    return await this.categoryService.getCategories();
  }

  // Obtenir une catégorie par son ID
  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return await this.categoryService.getCategory(id);
  }

  // Mettre à jour une catégorie
  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() body: { name: string }) {
    return await this.categoryService.updateCategory(id, body.name);
  }

  // Supprimer une catégorie
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoryService.deleteCategory(id);
  }
}
