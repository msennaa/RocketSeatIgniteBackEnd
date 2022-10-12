import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './Car.entities';
import { User } from './User.entities';

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.rental)
  @JoinColumn()
  user: User;

  @OneToOne(() => Car, (car) => car.rental)
  @JoinColumn()
  car: Car;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'timestamp' })
  expectedReturnDate: Date;

  @Column()
  total: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
