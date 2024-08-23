import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { NotificationRecipients } from '../../notification/entities/notificationRecipients.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @OneToMany(() => NotificationRecipients, (recipient) => recipient.role)
  roleNotifications: NotificationRecipients[];
}
