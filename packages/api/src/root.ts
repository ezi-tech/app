import { addressRouter } from "./router/address";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
