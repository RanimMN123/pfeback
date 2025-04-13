import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Assure-toi du bon import

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  // Créer une catégorie
  async createCategory(data: { name: string }) {
    return this.prisma.category.create({ data });
  }
  
  // Obtenir toutes les catégories
  async getCategories() {
    return this.prisma.category.findMany();
  }

  // Méthode pour récupérer une catégorie
  async getCategory(id: number) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  // Méthode pour mettre à jour une catégorie
  async updateCategory(id: number, name: string) {
    return await this.prisma.category.update({
      where: { id },
      data: { name },
    });
  }

  // Méthode pour supprimer une catégorie
  async deleteCategory(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
