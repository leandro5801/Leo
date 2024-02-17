import { Todo } from 'src/todo/entities/todo.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  username: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column({nullable:true})
  password:string;

  @OneToMany(() => Todo, (todo) => todo.user, {cascade:true, eager: true,onDelete:'CASCADE'})
  todo: Todo[];

  @BeforeInsert()
  check(){

  }
  @BeforeUpdate()
  checkUpdate(){

  }

}
