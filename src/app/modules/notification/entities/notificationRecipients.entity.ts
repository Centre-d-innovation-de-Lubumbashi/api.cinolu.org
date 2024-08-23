import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notifications.entity';
import { User } from '../../users/entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity()
export class NotificationRecipients {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Notification, (notification) => notification.recipients)
  notification: Notification;

  @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
  user: User;

  @ManyToOne(() => Role, (role) => role.roleNotifications, { nullable: true })
  role: Role;

  @Column({ default: false })
  is_read: boolean;
}
