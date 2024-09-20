import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  boolean,
  geometry,
  index,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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
    location: geometry("location", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
    houseNumber: text("house_number"),
    buildingName: text("building_name"),
    isDefault: boolean("is_default").default(false),
    formattedAddress: text("formatted_address").notNull(),
    deliveryInstructions: text("delivery_instructions"),
  },
  (t) => ({
    spatialIndex: index("spatial_index").using("gist", t.location),
  }),
);

export const CreateAddressSchema = createInsertSchema(Address, {
  location: z.object({ x: z.number(), y: z.number() }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
});

export const Region = pgTable(
  "region",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
    name: text("name").notNull(),
    // north east viewport bound
    locationNE: geometry("locationNE", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
    // south west viewport bound
    locationSW: geometry("locationSW", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
  },
  (t) => ({
    spatialIndex: index("spatial_index1").using("gist", t.locationNE, t.locationSW),
  }),
);

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
