import { IsNumber, IsString, IsBoolean } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsString()
  description: string;

  @Column({ nullable: false })
  @IsBoolean()
  done: boolean;

  @Column({type: 'text',array:true, nullable: true })
  @IsString()
  images: string[];

  @ManyToOne((type) => User, (user) => user.todo ,{eager: true})
  @JoinColumn({ name: 'id_user' })
  user: User;
}
