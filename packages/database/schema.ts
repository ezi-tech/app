import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp
} from "drizzle-orm/pg-core";

export const addresses = pgTable("addresses", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  userId: text("user_id")
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
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const userRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));
