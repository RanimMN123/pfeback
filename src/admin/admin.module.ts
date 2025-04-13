import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/PrismaModule'; 

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule
 ,JwtModule.register({
    secret: process.env.JWT_SECRET || 'secretKey', 
    signOptions: { expiresIn: '1d' },
  }),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
