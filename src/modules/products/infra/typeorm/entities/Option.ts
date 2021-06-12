import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import OptionGroup from './OptionGroup';

@Entity('options')
class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  group_id: string;

  @ManyToOne(() => OptionGroup, group => group.id)
  @JoinColumn({ name: 'group_id' })
  group: OptionGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Option;
