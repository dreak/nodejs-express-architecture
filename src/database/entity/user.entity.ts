import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 50 })
  name: string;
  @Column({ type: 'varchar', length: 20 })
  phone: string | null;
  @Column({ type: 'varchar', length: 50 })
  address: string;
  @CreateDateColumn({ type: 'datetime' })
  created_date: Date;
  @UpdateDateColumn({ type: 'datetime' })
  modified_date: Date;
}
