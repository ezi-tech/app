import { Client } from "@googlemaps/google-maps-services-js";

export function getMapsConfig() {
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set");
  }

  return {
    client: new Client({}),
    apiKey: GOOGLE_MAPS_API_KEY,
  };
}
