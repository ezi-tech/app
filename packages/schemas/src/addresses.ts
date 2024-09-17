import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { addresses } from "@ezi/database";

export const insertAddressSchema = createInsertSchema(addresses);
export const selectAddressSchema = createSelectSchema(addresses);
