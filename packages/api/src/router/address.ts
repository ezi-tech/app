import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq } from "@ezi/database";
import { db } from "@ezi/database/client";
import { Address, CreateAddressSchema } from "@ezi/database/schema";

import { defaultProcedure } from "../trpc";
import { getMapsConfig } from "../utils/googlemaps";

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

  select: defaultProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await db
        .update(Address)
        .set({ isDefault: false })
        .where(eq(Address.userId, ctx.userId));

      return await db
        .update(Address)
        .set({ isDefault: true })
        .where(eq(Address.id, input.id))
        .returning();
    }),

  createFromPlaceId: defaultProcedure
    .input(z.object({ placeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { apiKey, client } = getMapsConfig();

      const response = await client.placeDetails({
        params: {
          key: apiKey,
          place_id: input.placeId,
        },
      });

      const address = response.data.result;
      const latLng = address.geometry?.location;
      const formattedAddress = address.formatted_address;

      if (!latLng || !formattedAddress) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      await db
        .update(Address)
        .set({ isDefault: false })
        .where(eq(Address.userId, ctx.userId));

      return db.insert(Address).values({
        formattedAddress,
        name: address.name,
        latitude: latLng.lat.toString(),
        longitude: latLng.lng.toString(),
        userId: ctx.userId,
        isDefault: true,
      });
    }),
} satisfies TRPCRouterRecord;
