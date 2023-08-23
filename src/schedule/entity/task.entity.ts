import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class task {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  user_id: string

  @Column()
  description: string

  @Column()
  status: string

  @Column()
  dueDate: Date
}