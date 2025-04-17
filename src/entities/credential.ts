import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'CREDENTIAL' })
export class Credential {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: string;

  @Column({ name: 'USER_ID' })
  userId: string;

  @Column({ name: 'SERVICE' })
  service: string;

  @Column({ name: 'USER_NAME' })
  userName: string;

  @Column({ name: 'ACCESS_TOKEN' })
  accessToken: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'CREATED_AT'
  })
  createdAt: Date;
}
