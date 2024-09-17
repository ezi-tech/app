import { withAuth } from "@/lib/with-auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { insertAddressSchema } from "@ezi/api-schemas";
import { addresses, db } from "@ezi/database";

export const GET = withAuth(async ({ userId }) => {
  const results = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId));

  return NextResponse.json({
    data: {
      addresses: results,
    },
  });
});

export const POST = withAuth(async ({ req, userId }) => {
  const body = await req.json();

  try {
    const address = insertAddressSchema.parse({
      ...body,
      userId,
    });
    const results = await db.insert(addresses).values(address);

    return NextResponse.json({
      data: {
        addresses: results,
      },
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
