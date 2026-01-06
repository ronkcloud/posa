import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { OrderItem } from "../lib/validations";
import { sql } from "drizzle-orm";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  category: text("category"),
  price: real("price").notNull(),
  stock: integer("stock").default(0),
  description: text("description"),
});

export const orders = sqliteTable("orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  totalAmount: real("total_amount").notNull(),
  paymentMethod: text("payment_method"),
  orderDetails: text("order_details", { mode: "json" }).$type<OrderItem[]>().notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});