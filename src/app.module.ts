
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/PrismaModule'; 
import { CategoryModule } from './category/categoryModule'; 

@Module({
  imports: [
    AuthModule,
    AdminModule,
    PrismaModule,
    CategoryModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
