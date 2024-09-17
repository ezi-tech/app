import { clerkClient } from "@clerk/nextjs/server";
import { decode as jwtDecode } from "jsonwebtoken";
import { NextRequest } from "next/server";

type ClerkJwtPayload = {
  exp: number;
  iat: number;
  iss: string;
  nbf: number;
  sid: string;
  sub: string;
};

export function withAuth<T = {}>(
  handler: (args: {
    req: NextRequest;
    params: T;
    userId: string;
  }) => Promise<Response>,
) {
  return async (req: NextRequest, { params }: { params: T }) => {
    const { isSignedIn, token } = await clerkClient.authenticateRequest(req, {
      authorizedParties: ["https://example.com"],
    });

    if (!isSignedIn) {
      return Response.json({ status: 401 });
    }

    const payload = jwtDecode(token) as unknown as ClerkJwtPayload;
    const userId = payload.sub;

    return handler({ req, params, userId });
  };
}
