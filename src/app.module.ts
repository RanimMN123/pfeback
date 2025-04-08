import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/PrismaModule'; // Ajout du module Prisma

@Module({
  imports: [AuthModule, AdminModule, PrismaModule], // Ajout de PrismaModule ici
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
