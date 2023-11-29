import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("clients")
class Clients {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  email!: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({ type: "timestamp" })
  updated_at: Date = new Date();
}

export { Clients };
