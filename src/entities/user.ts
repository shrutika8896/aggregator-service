import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'USER' })
export class User {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'EMAIL', unique: true })
  email: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'CREATED_AT'
  })
  createdAt: Date;
}
