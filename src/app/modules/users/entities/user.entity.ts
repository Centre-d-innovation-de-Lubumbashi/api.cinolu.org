import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Program } from 'src/app/modules/programs/entities/program.entity';
import { NotificationRecipients } from '../../notification/entities/notificationRecipients.entity';
import { Notification } from '../../notification/entities/notifications.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ type: 'datetime', nullable: true, default: null })
  verified_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(() => Program, (program) => program.user)
  programs: Program[];

  @OneToMany(() => NotificationRecipients, (recipient) => recipient.user)
  notifications: NotificationRecipients[];

  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];
}
