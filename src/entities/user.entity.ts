import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'User' })
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
