import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueueProducerService } from './queues/queue.producer.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly queue: ProductQueueProducerService,
  ) {}

  async createProduct(dto: CreateProductDto, imagePaths: string[]) {
    const product = new this.productModel({
      ...dto,
      images: imagePaths,
    });
    const savedProduct = await product.save();
    await this.queue.addProductJob({ action: 'indexToSearch', id: savedProduct._id });
    return savedProduct;
  }

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

  async findOne(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto, imagePaths: string[]) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, dto);

    if (imagePaths.length > 0) {
      product.images = imagePaths;
    }

    const updated = await product.save();
    await this.queue.addProductJob({ action: 'updateIndex', id: updated._id });
    return updated;
  }

  async deleteProduct(id: string) {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Product not found');
    }
    await this.queue.addProductJob({ action: 'removeFromSearch', id });
    return { message: 'Product deleted successfully' };
  }
}
