import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../shared/utils/abstract.entity';
import { Program } from './program.entity';
import { Requirement } from './requirement.entity';
import { Document } from './document.entity';

@Entity()
export class Phase extends AbstractEntity {
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
