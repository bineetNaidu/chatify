import {
  Entity,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Relation,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Channel } from './Channel';
import { User } from './User';

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body!: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  author!: Relation<User>;

  @ManyToOne(() => Channel, (channel) => channel.messages)
  @JoinColumn()
  channel!: Relation<Channel>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
