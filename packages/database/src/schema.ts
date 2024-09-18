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
import { createInsertSchema } from "drizzle-zod";

export const Address = pgTable(
  "address",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
    name: text("name"),
    userId: text("user_id")
      .notNull()
      .references(() => User.id),
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

export const CreateAddressSchema = createInsertSchema(Address).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const AddressRelations = relations(Address, ({ one }) => ({
  user: one(User, { fields: [Address.userId], references: [User.id] }),
}));

export const User = pgTable("user", {
  id: text("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
});

export const userRelations = relations(User, ({ many }) => ({
  addresses: many(Address),
}));

export type Address = typeof Address.$inferSelect;
export type User = typeof User.$inferSelect;
