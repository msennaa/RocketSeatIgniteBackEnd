import { DriverLicense } from 'src/enum/enum.status';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rental } from './Rentals.entities';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: DriverLicense, nullable: true })
  driverLicense: DriverLicense;

  @Column({ default: false })
  admin: boolean;

  @OneToOne(() => Rental, (rental) => rental.user)
  rental: Rental;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
