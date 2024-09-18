import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { getEnv, getPublicEnv } from "./middleware/utils";

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
    authToken: string;
    sessionId: string;
  }) => Promise<Response>,
) {
  return async (req: NextRequest, { params }: { params: T }) => {
    const { isSignedIn, token } = await clerkClient().authenticateRequest(req, {
      secretKey: getEnv(req, "CLERK_SECRET_KEY"),
      publishableKey: getPublicEnv(req, "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"),
    });

    if (!isSignedIn) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { payload } = decodeJWT(token);
    const userId = payload.sub;
    const sessionId = payload.sid;

    return handler({ req, params, userId, sessionId, authToken: token });
  };
}

function decodeJWT(token: string) {
  // Split the token into its three parts
  const [header, payload, signature] = token.split(".");

  // Base64-decode the header and payload
  const base64UrlToUtf8 = (base64Url: string) => {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const utf8 = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return utf8;
  };

  const decodedHeader = JSON.parse(base64UrlToUtf8(header));
  const decodedPayload = JSON.parse(base64UrlToUtf8(payload));

  // Return the decoded header and payload
  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature: signature, // The signature cannot be decoded directly
  };
}
