import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Program } from '../../../programs/entities/program.entity';
import { Requirement } from '../../requirements/entities/requirement.entity';
import { Document } from '../../documents/entities/document.entity';
import { BaseEntity } from '../../../../shared/utils/base.entity';

@Entity()
export class Phase extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  started_at: Date;

  @Column({ type: 'datetime' })
  ended_at: Date;

  @Column({ type: 'json', nullable: true })
  form: JSON;

  @OneToMany(() => Requirement, (requirement) => requirement.phase)
  requirements: Requirement[];

  @OneToMany(() => Document, (document) => document.phase)
  documents: Document[];

  @ManyToOne(() => Program, (program) => program.phases)
  @JoinColumn({ name: 'programId' })
  program: Program;
}
