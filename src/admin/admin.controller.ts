import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateOrderDto } from './dto/createorder.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateOrderStatusDto } from './dto/updateorder-status.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Assurez-vous d'importer correctement le JwtAuthGuard
import { Request as ExpressRequest } from 'express'; // Assurez-vous d'importer correctement Request de express

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}


  // Route pour obtenir les informations de l'admin connecté (protégée par JWT)
  @Get('profile')
  @UseGuards(JwtAuthGuard)  // Cette route nécessite une authentification avec JWT
  getProfile(@Request() req: ExpressRequest) {
    return {
      message: 'Profil récupéré avec succès',
      admin: req.user,  // Cela retourne les données de l'admin connecté
    };
  }

  // Route pour créer un client
  @Post('clients')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async createClient(@Body() dto: CreateClientDto) {
    return this.adminService.createClient(dto);
  }

  // ======== PRODUITS ========

  // Créer un produit
  @Post('products')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const { name, description, price, categoryId } = createProductDto;
    return this.adminService.createProduct(name, description, price, categoryId);
  }

  // Récupérer tous les produits
  @Get('products')
  async getProducts() {
    return this.adminService.getProducts();
  }

  // Récupérer un produit par son ID
  @Get('products/:id')
  async getProductById(@Param('id') id: number) {
    return this.adminService.getProductById(Number(id));
  }

  // Mettre à jour un produit
  @Patch('products/:id')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async updateProduct(
    @Param('id') id: string,
    @Body() body: {
      name: string;
      description: string;
      price: number;
      categoryId: number;
    },
  ) {
    return this.adminService.updateProduct(
      Number(id),
      body.name,
      body.description,
      body.price,
      body.categoryId,
    );
  }

  // Supprimer un produit
  @Delete('products/:id')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async deleteProduct(@Param('id') id: number) {
    return this.adminService.deleteProduct(Number(id));
  }

  // ======== COMMANDES ========

  // Créer une commande
  @Post('orders')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async createOrder(@Body() dto: CreateOrderDto, @Request() req: ExpressRequest) {
    return this.adminService.createOrder(dto);
  }

  // Récupérer toutes les commandes
  @Get('orders')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async getAllOrders() {
    return this.adminService.getAllOrders();
  }

  // Récupérer une commande par ID
  @Get('orders/:id')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async getOrderById(@Param('id') id: number) {
    return this.adminService.getOrderById(Number(id));
  }

  // Mettre à jour le statut d'une commande
  @Patch('orders/:id/status')
  @UseGuards(JwtAuthGuard) // Protection avec JWT
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.adminService.updateOrderStatus(Number(id), dto.status);
  }
}
