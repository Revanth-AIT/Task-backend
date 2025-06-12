// src/products/dto/filter-product.dto.ts
import { IsOptional, IsString, IsBoolean, IsDateString } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  createdAfter?: string;

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}
