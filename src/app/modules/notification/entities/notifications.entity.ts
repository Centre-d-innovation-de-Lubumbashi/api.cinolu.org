import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { NotificationRecipients } from './notificationRecipients.entity';
import { Attachment } from '../../attachments/entities/attachment.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => NotificationRecipients, (recipient) => recipient.notification)
  recipients: NotificationRecipients[];

  @OneToMany(() => Attachment, (attachment) => attachment.notification)
  attachments: Attachment[];
}
