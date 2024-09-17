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

export async function withAuth<T>(
  cb: (req: NextRequest, ctx: T) => Promise<Response>,
) {
  return async function handle(req: NextRequest, ctx: T) {
    const { isSignedIn, token } = await clerkClient.authenticateRequest(req, {
      authorizedParties: ["https://example.com"],
    });

    if (!isSignedIn) {
      return Response.json({ status: 401 });
    }

    return cb(req, ctx);
  };
}

export function getUserId(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    throw new Error("Authorization header is missing");
  }

  const token = authHeader.split(" ")[1];
  const payload = jwtDecode(token) as ClerkJwtPayload;

  if (!payload) {
    throw new Error("Invalid token");
  }

  return payload.sub;
}
