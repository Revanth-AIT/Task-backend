import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(dto: CreateProductDto, imagePaths: string[]) {
    const product = new this.productModel({
      ...dto,
      images: imagePaths,
    });
    return product.save();
  }

  async findWithFilters(query: any) {
    const filter: any = {};

    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' };
    }

    if (query.inStock === 'true') {
      filter.stock = { $gt: 0 };
    }

    if (query.createdDate) {
      const start = new Date(query.createdDate);
      const end = new Date(query.createdDate);
      end.setHours(23, 59, 59, 999);
      filter.createdAt = { $gte: start, $lte: end };
    }

    return this.productModel.find(filter);
  }

  async findOne(id: string) {
    return this.productModel.findById(id);
  }

  async update(id: string, updateData: Partial<CreateProductDto>) {
    return this.productModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}