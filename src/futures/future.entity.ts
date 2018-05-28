import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Future {
  @PrimaryColumn()
  id: string;

  @Column()
  percentage: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  result: string;

  @Column()
  name: string;
}
