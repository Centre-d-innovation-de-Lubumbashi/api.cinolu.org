import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Program } from '../../programs/entities/program.entity';
import { Partnership } from '../../partnerships/entities/partnership.entity';

@Entity()
export class Partner extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  profile: string;

  @ManyToMany(() => Partnership, (partnership) => partnership.partners)
  @JoinTable({ name: 'partner_partnerships' })
  partnerships: Partnership[];

  @ManyToMany(() => Program, (program) => program.partners)
  programs: Program[];
}