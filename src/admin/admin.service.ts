import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/createorder.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  // ======== PRODUITS ========

  // Créer un produit
  async createProduct(name: string, description: string, price: number) {
    return this.prisma.product.create({
      data: {
        name,
        description,
        price,
      },
    });
  }

  // Récupérer tous les produits
  async getProducts() {
    return this.prisma.product.findMany();
  }

  // Récupérer un produit par son ID
  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Mettre à jour un produit
  async updateProduct(id: number, name: string, description: string, price: number) {
    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
      },
    });
  }

  // Supprimer un produit
  async deleteProduct(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  // ======== COMMANDES ========

  // Créer une commande
  async createOrder(dto: CreateOrderDto) {
    try {
      // Vérifie si le client existe
      const clientExists = await this.prisma.client.findUnique({
        where: { id: dto.clientId },
      });

      if (!clientExists) {
        throw new Error('Client not found');
      }

      // Crée la commande
      return this.prisma.order.create({
        data: {
          clientId: dto.clientId,
          items: {
            create: dto.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          items: {
            include: { product: true },
          },
          client: true,
        },
      });
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  // Récupérer toutes les commandes
  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: { product: true },
        },
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Récupérer une commande par ID
  async getOrderById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
        client: true,
      },
    });
  }

  // Mettre à jour le statut d'une commande
  async updateOrderStatus(id: number, status: string) {
    try {
      // Mise à jour du statut de la commande
      return this.prisma.order.update({
        where: { id },
        data: { status },
      });
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }
}
