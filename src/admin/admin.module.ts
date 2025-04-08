import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/PrismaModule'; // Ajout du module Prisma

@Module({
  imports: [PrismaModule], // Ajout de PrismaModule ici
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
