import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Restaurant from '@modules/restaurants/infra/typeorm/entities/Restaurant';
import Product from './Product';
import Option from './Option';

@Entity('options_group')
class OptionGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  required: boolean;

  @Column()
  max_quantity: number;

  @Column()
  min_quantity: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  restaurant_id: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.id)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Option, option => option.group, { eager: true })
  options: Option[];
}

export default OptionGroup;
