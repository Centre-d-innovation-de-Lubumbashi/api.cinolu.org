import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../shared/utils/base.entity';
import { Detail } from './detail.entity';

@Entity()
export class Expertise extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Detail, (detail) => detail.expertises)
  details: Detail[];
}
