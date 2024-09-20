type Point = { x: number; y: number };

export function withSRID(input: any) {
  return `ST_SetSRID(${input}, 4326)`;
}

export function makePoint(latLng: { latitude: number; longitude: number }) {
  return `ST_MakePoint(${latLng.longitude}, ${latLng.latitude})`;
}
