import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Restaurant from './Restaurant';

@Entity('address')
class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  number: number;

  @Column()
  additional: string;

  @Column()
  cep: string;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.id)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Address;
