import { ConnectionOptions, createConnection } from "typeorm";
import "dotenv/config";
import { v4 } from "uuid";

export const typeorm: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

export const urlTest = "http://localhost:8080";

export const testCreate = "development-server-test";

export async function deleteFromTable() {
  const connection = await createConnection({
    ...typeorm,
    name: v4(),
  });

  await connection.query(`DELETE FROM products WHERE name = '${testCreate}'`);
  await connection.query(`DELETE FROM clients WHERE name = '${testCreate}'`);
  await connection.query(
    `DELETE FROM product_categories WHERE name = '${testCreate}'`
  );
  await connection.query(
    `DELETE FROM master_orders WHERE date = '${testCreate}'`
  );

  connection.close();
}
