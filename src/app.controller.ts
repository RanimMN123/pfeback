
import { Controller, Get,Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CategoryService } from './category/category.service';  // Import du CategoryService


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly categoryService: CategoryService,  // Injection du CategoryService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('test/categories')
async createCategory(@Body() data: { name: string }) {
  return await this.categoryService.createCategory(data);
}


  // Route de test pour récupérer toutes les catégories
  @Get('test/categories')
  async getCategories() {
    const categories = await this.categoryService.getCategories();
    return categories;  // Retourne la liste des catégories
  }
 
}
