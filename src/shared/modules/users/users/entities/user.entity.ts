import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm';
import { Detail } from './detail.entity';
import { Role } from '../../roles/entities/role.entity';
import { Application } from '../../../../../programs/applications/applications/entities/application.entity';
import { Review } from '../../../../../programs/applications/reviews/entities/review.entity';
import { Program } from '../../../../../programs/programs/entities/program.entity';
import { Notification } from '../../../notifications/entities/notification.entity';
import { Event } from '../../../../../events/events/entities/event.entity';
import { BaseEntity } from '../../../../utils/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  google_image: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ type: 'datetime', nullable: true, default: null })
  verified_at: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(() => Review, (review) => review.reviewer)
  reviews: Review[];

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];

  @ManyToMany(() => Program)
  @JoinTable({ name: 'user_enrolled_programs' })
  enrolled_programs: Program[];

  @ManyToMany(() => Notification, (notification) => notification.recipients)
  @JoinTable({ name: 'user_notifications' })
  notifications: Notification[];

  @OneToOne(() => Detail, (detail) => detail.user)
  detail: Detail;

  @OneToMany(() => Event, (event) => event.responsible)
  events: Event[];
}
