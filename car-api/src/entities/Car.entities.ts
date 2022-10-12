import { DriverLicense } from 'src/enum/enum.status';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarImage } from './CarImage.entities';
import { Rental } from './Rentals.entities';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  dailyRate: number;

  @Column()
  available: boolean;

  @Column({ type: 'enum', enum: DriverLicense, nullable: true })
  licensePlate: DriverLicense;

  @Column()
  fineAmount: number;

  @Column()
  brand: string;

  @OneToOne(() => Rental, (rental) => rental.car)
  rental: Rental;

  @OneToMany(() => CarImage, (carimage) => carimage.car)
  carImage: CarImage;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
