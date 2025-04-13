import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/PrismaModule'; 
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; 
import { JwtAuthGuard } from './jwt-auth.guard'; 

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', 
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),  // Enregistrer la stratégie JWT par défaut
    PrismaModule,
  ],
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy, JwtAuthGuard], 
  exports: [AuthService], // si je veux l'utiliser ailleurs
})
export class AuthModule {}
