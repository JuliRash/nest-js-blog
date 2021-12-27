import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostsRepository } from './posts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepository, CategoriesRepository])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
