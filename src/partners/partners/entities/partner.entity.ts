import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Program } from '../../../programs/programs/entities/program.entity';
import { Partnership } from '../../partnerships/entities/partnership.entity';
import { BaseEntity } from '../../../shared/utils/base.entity';

@Entity()
export class Partner extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  website_link: string;

  @Column({ nullable: true })
  profile: string;

  @ManyToMany(() => Partnership, (partnership) => partnership.partners)
  @JoinTable({ name: 'partner_partnerships' })
  partnerships: Partnership[];

  @ManyToMany(() => Program, (program) => program.partners)
  programs: Program[];
}
