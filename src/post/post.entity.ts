import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  body: string;

  @ManyToOne((type) => Category, (categories) => categories.post, {
    eager: false,
  })
  categories: Category;

  @ManyToOne((type) => User, (user) => user.posts, { eager: false })
  user: User;
}
