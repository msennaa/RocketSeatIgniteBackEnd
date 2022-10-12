import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from './Car.entities';

@Entity('carsImage')
export class CarImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, (car) => car.carImage)
  @JoinColumn()
  car: Car;

  @Column()
  imageName: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
