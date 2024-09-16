import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    numeric,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  latitude: numeric("latitude").notNull(),
  longitude: numeric("longitude").notNull(),
  houseNumber: text("house_number").notNull(),
  buildingName: text("building_name").notNull(),
  isDefault: boolean("is_default").notNull(),
  deliveryInstructions: text("delivery_instructions"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const addressRelations = relations(addresses, ({ one }) => ({
  user: one(users, { fields: [addresses.userId], references: [users.id] }),
}));

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));
