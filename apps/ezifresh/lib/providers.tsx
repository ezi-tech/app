import { ApolloProvider } from "@apollo/client";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";

import { TRPCProvider } from "./api";
import { apolloClient } from "./apollo";
import { tokenCache } from "./session-store";

declare const process: {
  env: {
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
  };
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apolloClient}>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <ClerkLoaded>
          <TRPCProvider>{children}</TRPCProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </ApolloProvider>
  );
}
