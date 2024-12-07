import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Partner } from '../../partners/entities/partner.entity';
import { Application } from './application.entity';
import { Category } from './category.entity';
import { Phase } from './phase.entity';
import { Type } from './type.entity';

@Entity()
export class Program extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  started_at: Date;

  @Column({ type: 'date' })
  ended_at: Date;

  @Column({ type: 'text' })
  targeted_audience: string;

  @Column({ type: 'text', nullable: true })
  aim: string;

  @Column({ type: 'text', nullable: true })
  prize: string;

  @Column({ nullable: true })
  town: string;

  @OneToMany(() => Phase, (phase) => phase.program)
  phases: Phase[];

  @OneToMany(() => Application, (application) => application.program)
  applications: Application[];

  @ManyToMany(() => Type, (type) => type.programs)
  @JoinTable({ name: 'program_types' })
  types: Type[];

  @ManyToMany(() => Category, (category) => category.programs)
  @JoinTable({ name: 'program_categories' })
  categories: Category[];

  @ManyToMany(() => Partner, (partner) => partner.programs)
  @JoinTable({ name: 'program_partners' })
  partners: Partner[];
}
