import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const admin = await this.authService.validateAdmin(body.email, body.password);
    if (!admin) {
       throw new UnauthorizedException('Invalid credentials');
     } 
    return this.authService.login(admin);
  }
}