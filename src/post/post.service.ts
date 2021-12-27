import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/category.dto';
import { CreatePostDto } from './dto/post.dto';
import { PostFilterDto } from './dto/posts-filter.dto';
import { Post } from './post.entity';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository)
    private postsRepository: PostsRepository,
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}
  async getAllPosts(postFilterDto: PostFilterDto): Promise<Post[]> {
    return this.postsRepository.getAllPosts(postFilterDto);
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { title, body, category } = createPostDto;
    const postCategory = await this.getCategoryIdByName(category);
    const postData = { title, body, postCategory };
    return await this.postsRepository.createPost(postData);
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesRepository.createCategory(createCategoryDto);
  }

  async getPostsByCategories(category: string): Promise<Post[]> {
    return await this.postsRepository.postsByCategory(category);
  }

  async getAllPostCategories(): Promise<Category[]> {
    return this.categoriesRepository.getAllCategory();
  }

  async getCategoryIdByName(category: string): Promise<string> {
    const categoryExists = await this.categoriesRepository.findOne({
      name: category,
    });
    if (categoryExists) {
      return categoryExists.id;
    } else {
      throw new NotFoundException(
        `category with the name ${category} does not exist`,
      );
    }
  }
}
