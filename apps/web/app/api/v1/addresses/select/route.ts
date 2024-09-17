import { withAuth } from "@/lib/with-auth";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { insertAddressSchema } from "@ezi/api-schemas";
import { addresses, db } from "@ezi/database";

export const POST = withAuth(async ({ req, userId }) => {
  const body = await req.json();

  try {
    const addressBody = insertAddressSchema.parse({
      ...body,
      userId,
    });

    let activeAddressId: string | null = null;

    // existing address
    if (addressBody.id) {
      activeAddressId = addressBody.id;
    } else {
      const res = await db.insert(addresses).values(addressBody).returning();
      activeAddressId = res[0].id;
    }

    // reset previous default address
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(and(eq(addresses.userId, userId), eq(addresses.isDefault, true)));

    // set new default address
    await db
      .update(addresses)
      .set({ isDefault: true })
      .where(eq(addresses.id, activeAddressId));

    return NextResponse.json({
      status: "success",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.errors), {
        status: 400,
      });
    }

    return new Response(
      "We could not complete the request. Please try again later",
      {
        status: 500,
      },
    );
  }
});
