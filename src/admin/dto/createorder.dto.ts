// src/admin/dto/createorder.dto.ts

import { IsInt, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class CreateOrderDto {
  @IsInt()
  clientId: number;

  @IsOptional()
  @IsString()
  clientName?: string;

  @IsOptional()
  @IsString()
  clientEmail?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}