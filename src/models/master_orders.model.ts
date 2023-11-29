import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { Clients, Orders } from ".";

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
  order_status: string = "in progress";

  @ManyToOne(() => Clients, (client) => client.id)
  @JoinColumn({ name: "client_id" })
  client_id!: Clients;

  @OneToMany(() => Orders, (order) => order.master_order_id)
  orders!: Orders[];

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
