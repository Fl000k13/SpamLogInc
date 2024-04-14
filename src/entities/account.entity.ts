import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Account', schema: 'public' })
export class Account {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'text' })
  login: string;

  @Column({ type: 'integer' })
  password: number;

  @Column({ type: 'boolean' })
  used: boolean;

  @Column({ type: 'date' })
  whenUsed: Date;

  @Column({ type: 'text' })
  city: string;

  @Column({ type: 'text' })
  sex: string;
}
