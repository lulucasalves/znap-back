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

  @Column({ type: "varchar" })
  city!: string;

  @Column({ type: "varchar" })
  state!: string;

  @Column({ type: "varchar" })
  address!: string;

  @Column({ type: "varchar" })
  cep!: string;

  @Column({ type: "int" })
  address_number!: number;

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
