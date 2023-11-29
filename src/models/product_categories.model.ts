import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  AfterUpdate,
} from "typeorm";

@Entity("product_categories")
class ProductCategories {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", unique: true, length: 25 })
  name!: string;

  @Column({ type: "bool" })
  available: boolean = true;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at!: Date;

  @Column({ type: "timestamp" })
  updated_at: Date = new Date();
}

export { ProductCategories };
