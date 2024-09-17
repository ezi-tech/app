export const SOKO_HOSTNAMES = ["ezisoko.shop"];
export const FRESH_HOSTNAMES = ["ezifresh.shop"];
export const API_HOSTNAMES = new Set([
  "api.ezisoko.shop",
  "api.ezifresh.shop",
  "api.dev.ezisoko.shop",
  "api.dev.ezifresh.shop",
]);

/**
 * Get env var for ezifresh/ezisoko
 *
 * If you pass the value `WEBHOOK_SECRET`, this function will return either
 * `FRESH_WEBHOOK_SECRET` or `SOKO_WEBHOOK_SECRET` depending on the hostname.
 */
export function getEnv(req: Request, env: string) {
  const host = req.headers.get("host") as string;
  const domain = host.replace("www.", "").toLowerCase();

  if (SOKO_HOSTNAMES.includes(domain)) {
    return process.env[`SOKO_${env}`];
  } else if (FRESH_HOSTNAMES.includes(domain)) {
    return process.env[`FRESH_${env}`];
  }

  return process.env[env];
}
