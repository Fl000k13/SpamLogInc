import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'User', schema: 'public' })
export class User {
  @PrimaryColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'integer' })
  number: number;

  @Column({ type: 'integer' })
  monthlylogs: number;

  @Column({ type: 'integer' })
  monthlyreturns: number;
}
