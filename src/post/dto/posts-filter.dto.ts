import { ApiProperty } from '@nestjs/swagger';

export class PostFilterDto {
  @ApiProperty({ required: false })
  search?: string;
}
