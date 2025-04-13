import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}
  

  async validateAdmin(email: string, pass: string) {
    const admin = await this.prisma.admin.findUnique({ where: { email } });
  
    if (admin) {
      console.log('Admin trouvé:', admin);
      console.log('Mot de passe envoyé:', pass);
  
      // Comparer le mot de passe brut avec le hash stocké dans la base de données
      const isPasswordValid = await bcrypt.compare(pass, admin.password); 
  
      console.log('Le mot de passe correspond-il ?', isPasswordValid); 
  
      // Si la comparaison réussit
      if (isPasswordValid) {
        const { password, ...result } = admin;
        return result; // Retourne l'admin sans le mot de passe
      }
    }
  
    return null; // Si l'admin n'est pas trouvé ou que le mot de passe est incorrect
  }
  



  async login(admin: any) {
    const payload = { email: admin.email, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}