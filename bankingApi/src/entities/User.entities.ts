import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  statement: any;

  @Column({ default: 0, type: 'float' })
  amount: number;
}
