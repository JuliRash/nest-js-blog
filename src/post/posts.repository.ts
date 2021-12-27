import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PostFilterDto } from './dto/posts-filter.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  async getAllPosts(postFilterDto: PostFilterDto): Promise<Post[]> {
    const query = await this.createQueryBuilder('post');
    const { search } = postFilterDto;
    if (search) {
      query.andWhere(
        '(LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.body) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    return query.getMany();
  }

  async createPost({ title, body, postCategory }): Promise<Post> {
    const post = this.create({ title, body, categories: postCategory });
    try {
      await this.save(post);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('post with that title exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return post;
  }

  async postsByCategory(category: string): Promise<Post[]> {
    const query = await this.createQueryBuilder('post');
    const posts = query.where('post.categories =  :category', { category });
    return posts.getMany();
  }
}
