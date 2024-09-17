import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  numeric,
  pgTable,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

const id = text("id")
  .primaryKey()
  .$defaultFn(() => createId());

const createdAt = timestamp("created_at").notNull().defaultNow();
const updatedAt = timestamp("updated_at")
  .defaultNow()
  .$onUpdate(() => new Date());

export const addresses = pgTable(
  "addresses",
  {
    id,
    createdAt,
    updatedAt,
    name: text("name"),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    latitude: numeric("latitude").notNull(),
    longitude: numeric("longitude").notNull(),
    houseNumber: text("house_number"),
    buildingName: text("building_name"),
    isDefault: boolean("is_default").default(false),
    formattedAddress: text("formatted_address").notNull(),
    deliveryInstructions: text("delivery_instructions"),
  },
  (t) => ({
    latLngUnique: unique().on(t.latitude, t.longitude, t.userId),
  }),
);

export const addressRelations = relations(addresses, ({ one }) => ({
  user: one(users, { fields: [addresses.userId], references: [users.id] }),
}));

export const users = pgTable("users", {
  id,
  createdAt,
  updatedAt,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
});

export const userRelations = relations(users, ({ many }) => ({
  addresses: many(addresses),
}));
