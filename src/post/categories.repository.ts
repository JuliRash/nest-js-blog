import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/category.dto';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async getAllCategory(): Promise<Category[]> {
    const query = await this.createQueryBuilder('category');

    return query.getMany();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, description } = createCategoryDto;
    const category = this.create({ name, description });
    try {
      await this.save(category);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('category name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return category;
  }
}
