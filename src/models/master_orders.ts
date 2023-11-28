import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Clients } from ".";

@Entity("master_orders")
class MasterOrders {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "float" })
  shipping!: string;

  @Column({ type: "varchar" })
  date!: string;

  @Column({ type: "varchar" })
  min_date!: string;

  @Column({ type: "varchar" })
  max_date!: string;

  @Column({ type: "varchar" })
  order_status: string = "active";

  @ManyToOne(() => Clients, (client) => client.id)
  @JoinColumn({ name: "client_id" })
  client_id!: Clients;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({ type: "timestamp" })
  updated_at: Date = new Date();
}

export { MasterOrders };
