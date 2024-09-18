import { AddressType } from "@googlemaps/google-maps-services-js";
import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { and, desc, eq } from "@ezi/database";
import { db } from "@ezi/database/client";
import { Address, CreateAddressSchema } from "@ezi/database/schema";

import { defaultProcedure } from "../trpc";
import { getMapsConfig } from "../utils/googlemaps";

function resetDefaultAddress(userId: string) {
  return db
    .update(Address)
    .set({ isDefault: false })
    .where(and(eq(Address.userId, userId), eq(Address.isDefault, true)));
}

export const addressRouter = {
  all: defaultProcedure.query(async ({ ctx }) => {
    const results = await db
      .select()
      .from(Address)
      .where(eq(Address.userId, ctx.userId))
      .orderBy(desc(Address.createdAt));

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

  placeDetails: defaultProcedure
    .input(
      z.object({
        latitude: z.string().optional(),
        longitude: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      if (!input.latitude || !input.longitude) {
        return null;
      }

      const { apiKey, client } = getMapsConfig();

      const response = await client.reverseGeocode({
        params: {
          key: apiKey,
          latlng: `${input.latitude},${input.longitude}`,
          result_type: [AddressType.locality],
        },
      });

      const address = response.data.results[0];
      if (!address) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      const placeResponse = await client.placeDetails({
        params: {
          key: apiKey,
          place_id: address.place_id,
        },
      });
      const place = placeResponse.data.result;

      return place.name;
    }),

  autocomplete: defaultProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      const { apiKey, client } = getMapsConfig();

      const response = await client.placeAutocomplete({
        params: {
          key: apiKey,
          input: input,
          components: ["country:KE"],
        },
      });

      return response.data.predictions;
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
      await resetDefaultAddress(ctx.userId);

      return await db
        .update(Address)
        .set({ isDefault: true })
        .where(eq(Address.id, input.id))
        .returning();
    }),

  createFromLatLng: defaultProcedure
    .input(z.object({ latitude: z.string(), longitude: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { apiKey, client } = getMapsConfig();

      const existing = await db
        .select()
        .from(Address)
        .where(
          and(
            eq(Address.userId, ctx.userId),
            eq(Address.latitude, input.latitude),
            eq(Address.longitude, input.longitude),
          ),
        );

      if (existing[0]) {
        await resetDefaultAddress(ctx.userId);

        return db
          .update(Address)
          .set({ isDefault: true })
          .where(eq(Address.id, existing[0].id))
          .returning();
      }

      // create a new address
      const response = await client.reverseGeocode({
        params: {
          key: apiKey,
          latlng: `${input.latitude},${input.longitude}`,
          result_type: [AddressType.sublocality_level_1, AddressType.locality],
        },
      });

      const address = response.data.results[0];
      if (!address) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      const placeResponse = await client.placeDetails({
        params: {
          key: apiKey,
          place_id: address.place_id,
        },
      });
      const place = placeResponse.data.result;
      const formattedAddress = place.formatted_address;

      if (!formattedAddress) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Location not found",
        });
      }

      await resetDefaultAddress(ctx.userId);

      return db.insert(Address).values({
        name: place.name,
        formattedAddress,
        latitude: input.latitude,
        longitude: input.longitude,
        userId: ctx.userId,
        isDefault: true,
      });
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

      await resetDefaultAddress(ctx.userId);

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
