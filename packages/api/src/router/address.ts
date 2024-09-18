import type { TRPCRouterRecord } from "@trpc/server";

import { eq } from "@ezi/database";
import { db } from "@ezi/database/client";
import { Address, CreateAddressSchema } from "@ezi/database/schema";

import { defaultProcedure } from "../trpc";

export const addressRouter = {
  all: defaultProcedure.query(async ({ ctx }) => {
    const results = await db
      .select()
      .from(Address)
      .where(eq(Address.userId, ctx.userId));

    return results;
  }),

  default: defaultProcedure.query(async ({ ctx }) => {
    const results = await db
      .select()
      .from(Address)
      .where(eq(Address.userId, ctx.userId));

    const defaultAddress = results.find((address) => address.isDefault);
    const firstAvailableAddress = results[0];
    const fallbackAddress: Partial<Address> = {
      id: "default",
      formattedAddress: "Westlands, Nairobi",
      latitude: "-1.286389",
      longitude: "36.817223",
    };

    return defaultAddress || firstAvailableAddress || fallbackAddress;
  }),

  create: defaultProcedure
    .input(CreateAddressSchema)
    .mutation(async ({ ctx, input }) => {
      return db.insert(Address).values({
        ...input,
        userId: ctx.userId,
      });
    }),
} satisfies TRPCRouterRecord;
