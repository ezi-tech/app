import { createId } from "@paralleldrive/cuid2";
import { or, relations } from "drizzle-orm";
import {
  boolean,
  decimal,
  geometry,
  index,
  pgTable,
  primaryKey,
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
    spatialIndex: index("address_spatial_index").using("gist", t.location),
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
    locationCenter: geometry("location_center", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
    // north east viewport bound
    locationNE: geometry("location_north_east", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
    // south west viewport bound
    locationSW: geometry("location_south_west", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
  },
  (t) => ({
    spatialIndex: index("region_spatial_index").using(
      "gist",
      t.locationNE,
      t.locationSW,
    ),
  }),
);

export const AddressRelations = relations(Address, ({ one }) => ({
  user: one(User, { fields: [Address.userId], references: [User.id] }),
}));

export const User = pgTable("user", {
  // clerk will provide the user id
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
  organizations: many(Organization),
}));

export const Organization = pgTable("organization", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  users: text("users").array(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),

});

export const OrganizationRelations = relations(Organization, ({ many }) => ({
  users: many(User),
}));

export const Store = pgTable(
  "store",
  {
    // clerk will provide the org id
    id: text("id").primaryKey().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
    // store location and find region on the fly
    location: geometry("location", {
      type: "point",
      mode: "xy",
      srid: 4326,
    }).notNull(),
    name: text("name").notNull(),
    regionId: text("region_id")
      .notNull()
      .references(() => Region.id),
    description: text("description"),
    legalName: text("legal_name").notNull(),
    ownerId: text("store_owner_id")
      .notNull()
      .references(() => User.id),
  },
  (t) => ({
    spatialIndex: index("store_spatial_index").using("gist", t.location),
    regionIndex: index("region_index").on(t.regionId),
  }),
);

export const StoreMember = pgTable(
  "store_member",
  {
    userId: text("user_id")
      .notNull()
      .references(() => User.id),
    storeId: text("store_id")
      .notNull()
      .references(() => Store.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.storeId] }),
  }),
);

export const StoreMemberRelations = relations(StoreMember, ({ one }) => ({
  user: one(User, {
    fields: [StoreMember.userId],
    references: [User.id],
  }),
  store: one(Store, {
    fields: [StoreMember.storeId],
    references: [Store.id],
  }),
}));

export const StoreRelations = relations(Store, ({ one, many }) => ({
  storeOwner: one(User, {
    fields: [Store.ownerId],
    references: [User.id],
  }),
  members: many(StoreMember),
  products: many(StoreProduct),
  region: one(Region, {
    fields: [Store.regionId],
    references: [Region.id],
  }),
}));

export const StoreProduct = pgTable(
  "store_product",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", {
      mode: "date",
      withTimezone: true,
    }).$onUpdate(() => new Date()),
    storeId: text("store_id")
      .notNull()
      .references(() => Store.id),
    shopifyProductId: text("shopify_product_id").notNull(),
    shopifyVariantId: text("shopify_variant_id").notNull(),
    // override the product name from shopify
    // i.e we may have "Banana" as the product name
    // vendor may want to display "Fresh Local Bananas"
    displayName: text("display_name"),
    description: text("description"),
  },
  (t) => ({
    shopifyProductIndex: index("shopify_product_index").on(t.shopifyProductId),
    shopifyVariantIndex: index("shopify_variant_index").on(t.shopifyVariantId),
  }),
);

export const StoreProductRelations = relations(
  StoreProduct,
  ({ one, many }) => ({
    store: one(Store, {
      fields: [StoreProduct.storeId],
      references: [Store.id],
    }),
    variants: many(StoreProductVariant),
  }),
);

/**
 * Example:
 * Watermelons can be sold in slices, or wholes
 * Shopify product: Watermelon (with images and default metadata)
 * - StoreProduct: Watermelon Whole
 *  - StoreProductVariant: 500g
 *  - StoreProductVariant: 1kg
 */

export const StoreProductVariant = pgTable("store_product_variant", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).$onUpdate(() => new Date()),
  storeProductId: text("store_product_id")
    .notNull()
    .references(() => StoreProduct.id),
  // can also be "default" for the default variant
  name: text("name").notNull(),
  available: boolean("available").default(false),
  price: decimal("price").notNull(),
  compareAtPrice: decimal("compare_at_price"),
  weightInGrams: decimal("weight_in_grams"),
});

export const StoreProductVariantRelations = relations(
  StoreProductVariant,
  ({ one }) => ({
    storeProduct: one(StoreProduct, {
      fields: [StoreProductVariant.storeProductId],
      references: [StoreProduct.id],
    }),
  }),
);

export type Address = typeof Address.$inferSelect;
export type User = typeof User.$inferSelect;
export type Organization = typeof Organization.$inferSelect;
