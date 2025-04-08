import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Assurez-vous d'exporter PrismaService pour pouvoir l'utiliser ailleurs
})
export class PrismaModule {}
