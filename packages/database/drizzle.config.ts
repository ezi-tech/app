import { defineConfig } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

const nonPoolingUrl = process.env.POSTGRES_URL.replace(":6543", ":5432");

export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: nonPoolingUrl },
  verbose: true,
  strict: true,
  extensionsFilters: ["postgis"],
});
