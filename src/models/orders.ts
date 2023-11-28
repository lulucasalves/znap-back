import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Products, MasterOrders } from ".";

@Entity("orders")
class Orders {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "int" })
  quantity!: string;

  @ManyToOne(() => MasterOrders, (masterOrder) => masterOrder.id)
  @JoinColumn({ name: "master_order_id" })
  master_order_id!: MasterOrders;

  @ManyToOne(() => Products, (product) => product.id)
  @JoinColumn({ name: "product_id" })
  product_id!: MasterOrders;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({ type: "timestamp" })
  updated_at: Date = new Date();
}

export { Orders };
