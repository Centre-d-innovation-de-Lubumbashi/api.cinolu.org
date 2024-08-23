import { Program } from 'src/app/modules/programs/entities/program.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Notification } from '../../notification/entities/notifications.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Program, (program) => program.attachments)
  program: Program;

  @ManyToOne(() => Notification, (notification) => notification.attachments, { nullable: true })
  notification: Notification;
}
