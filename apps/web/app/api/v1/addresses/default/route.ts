import { withAuth } from "@/lib/with-auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { Address, addresses, db } from "@ezi/database";

export const GET = withAuth(async ({ userId }) => {
  const results = await db
    .select()
    .from(addresses)
    .where(eq(addresses.userId, userId));

  const defaultAddress = results.find((address) => address.isDefault);
  const firstAvailableAddress = results[0];
  const fallbackAddress: Partial<Address> = {
    id: "default",
    formattedAddress: "Westlands, Nairobi",
    latitude: "-1.286389",
    longitude: "36.817223",
  };

  return NextResponse.json({
    data: {
      address: defaultAddress || firstAvailableAddress || fallbackAddress,
    },
  });
});
