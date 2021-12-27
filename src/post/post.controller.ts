import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/category.dto';
import { CreatePostDto } from './dto/post.dto';
import { PostFilterDto } from './dto/posts-filter.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  getAllPost(@Query() postFilterDto: PostFilterDto) {
    return this.postService.getAllPosts(postFilterDto);
  }

  @Post('/')
  @ApiCreatedResponse({ description: 'create new post' })
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get('/category/:category')
  getPostsByCategory(@Param('category') category: string) {
    return this.postService.getPostsByCategories(category);
  }

  @Get('/category')
  getAllCategories() {
    return this.postService.getAllPostCategories();
  }

  @Post('/category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.postService.createCategory(createCategoryDto);
  }
}
