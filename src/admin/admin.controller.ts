import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateOrderDto } from './dto/createorder.dto';
import { UpdateOrderStatusDto } from './dto/updateorder-status.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ======== PRODUITS ========

  @Post('products')
  async createProduct(
    @Body() body: { name: string; description: string; price: number },
  ) {
    return this.adminService.createProduct(
      body.name,
      body.description,
      body.price,
    );
  }

  @Get('products')
  async getProducts() {
    return this.adminService.getProducts();
  }

  @Get('products/:id')
  async getProductById(@Param('id') id: number) {
    return this.adminService.getProductById(Number(id));
  }

  @Patch('products/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() body: { name: string; description: string; price: number },
  ) {
    return this.adminService.updateProduct(
      Number(id),
      body.name,
      body.description,
      body.price,
    );
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: number) {
    return this.adminService.deleteProduct(Number(id));
  }

  // ======== COMMANDES ========

  @Post('orders')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.adminService.createOrder(createOrderDto);
  }

  @Get('orders')
  async getAllOrders() {
    return this.adminService.getAllOrders();
  }

  @Get('orders/:id')
  async getOrderById(@Param('id') id: number) {
    return this.adminService.getOrderById(Number(id));
  }

  @Patch('orders/:id/status')
  async updateOrderStatus(
    @Param('id') id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.adminService.updateOrderStatus(Number(id), dto.status);
  }
}
