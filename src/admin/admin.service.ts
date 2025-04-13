import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from '../admin/dto/createorder.dto';
import { CreateClientDto } from '../admin/dto/create-client.dto';  
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 
import { Request as ExpressRequest } from 'express'; 


@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,  // Ajout de JwtService pour la gestion des tokens
  ) {}

  // Créer un client
  async createClient(dto: CreateClientDto) {
    try {
      // Vérifier si le client existe déjà par exemple
      const existingClient = await this.prisma.client.findUnique({
        where: { email: dto.email },  // Vérifier l'unicité de l'email
      });

      if (existingClient) {
        throw new Error('Client with this email already exists');
      }

      // Créer le client
      return await this.prisma.client.create({
        data: {
          name: dto.name,
          email: dto.email,
          phoneNumber: dto.phoneNumber,
        },
      });
    } catch (error) {
      console.error('Error creating client:', error);
      throw new Error(`Failed to create client: ${error.message}`);
    }
  }

  // Créer un produit avec une catégorie
  async createProduct(name: string, description: string, price: number, categoryId: number) {
    return this.prisma.product.create({
      data: {
        name,
        description,
        price,
        category: { connect: { id: categoryId } }, // Connexion de la catégorie via categoryId
      },
    });
  }

  // Récupérer un produit par son ID
  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Mettre à jour un produit
  async updateProduct(
    id: number,
    name: string,
    description: string,
    price: number,
    categoryId: number
  ) {
    // Vérifie si le produit existe avant la mise à jour
    const productExists = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new Error('Product not found');
    }

    // Met à jour le produit avec les nouvelles données
    return this.prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        category: { connect: { id: categoryId } },  
      },
    });
  }

  // Supprimer un produit
  async deleteProduct(id: number) {
    try {
      return this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  // ======== COMMANDES ========

 // Créer une commande
async createOrder(dto: CreateOrderDto) {
  try {
    // Vérifier si le client existe
    let client = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!client) {
      // Si le client n'existe pas, le créer
      if (!dto.clientName || !dto.clientEmail) {
        throw new Error('Client name and email are required to create a new client');
      }

      client = await this.prisma.client.create({
        data: {
          name: dto.clientName,
          email: dto.clientEmail,
        },
      });
    }

    // Vérifier si les produits existent
    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
    }

    // Créer la commande
    const order = await this.prisma.order.create({
      data: {
        clientId: client.id,
        // Pas d'adminId 
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

    return order;
  } catch (error) {
    console.error(`Erreur lors de la création de la commande pour le client ID ${dto.clientId}:`, error);
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
    // Vérifie si la commande existe
    const orderExists = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!orderExists) {
      throw new Error('Order not found');
    }

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

  // Récupérer tous les produits
  async getProducts() {
    try {
      return this.prisma.product.findMany({
        include: {
          category: true, 
        },
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
      throw new Error(`Failed to retrieve products: ${error.message}`);
    }
  }
}
