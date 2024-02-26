import { Todo } from 'src/todo/entities/todo.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false ,unique:true})
  username: string;

  @CreateDateColumn()
  dateCreated: Date;

  @Column({nullable:false})
  password:string;

  @Column('bool',{default:true})
  isActive:boolean

  @Column('text',{unique:true})
  email:string

  @Column('text',{array: true, default:["user"]})
  roles:string[]

  @OneToMany(() => Todo, (todo) => todo.user, {cascade:true,onDelete:'CASCADE'})
  todo: Todo[];

  @BeforeInsert()
  checkFields(){
this.email=this.email.toLowerCase().trim()
  }
  @BeforeUpdate()
  checkUpdateFields(){
    this.email=this.email.toLowerCase().trim()
  }

}
