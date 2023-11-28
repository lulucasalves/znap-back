import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { ProductCategories } from ".";

@Entity("products")
class Products {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "int" })
  stock!: number;

  @Column({ type: "boolean" })
  available: boolean = true;

  @Column({ type: "float" })
  weight!: number;

  @Column({ type: "float" })
  height!: number;

  @Column({ type: "float" })
  width!: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({ type: "timestamp" })
  updated_at: Date = new Date();

  @Column({ type: "float" })
  length!: number;

  @ManyToOne(() => ProductCategories, (category) => category.id)
  @JoinColumn({ name: "category_id" })
  category_id!: ProductCategories;
}

export { Products };
