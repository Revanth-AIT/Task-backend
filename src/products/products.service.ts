import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  // CREATE
  async createProduct(dto: CreateProductDto, imagePaths: string[]) {
    const product = new this.productModel({
      ...dto,
      images: imagePaths,
    });
    return product.save();
  }

  // READ ALL WITH FILTERS
  async findWithFilters(query: any) {
    const filter: any = {};
    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' };
    }
    if (query.inStock !== undefined) {
      filter.inStock = query.inStock === 'true';
    }
    if (query.createdAfter) {
      filter.createdAt = { $gte: new Date(query.createdAfter) };
    }
    return this.productModel.find(filter).exec();
  }

  // READ ONE BY ID
  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  // UPDATE
  async updateProduct(id: string, dto: UpdateProductDto, imagePaths: string[]) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, dto);

    if (imagePaths.length > 0) {
      product.images = imagePaths;
    }

    return product.save();
  }

  // DELETE
  async deleteProduct(id: string) {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product deleted successfully' };
  }
}
