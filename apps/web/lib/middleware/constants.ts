export const SOKO_HOSTNAMES = ["ezisoko.shop"];
export const FRESH_HOSTNAMES = ["ezifresh.shop"];
export const SOKO_API_HOSTNAMES = ["api.ezisoko.shop", "api.dev.ezisoko.shop"];
export const FRESH_API_HOSTNAMES = [
  "api.ezifresh.shop",
  "api.dev.ezifresh.shop",
];

export const API_HOSTNAMES = new Set([
  ...SOKO_API_HOSTNAMES,
  ...FRESH_API_HOSTNAMES,
]);

export function isFreshDomain(domain: string) {
  return (
    FRESH_HOSTNAMES.includes(domain) || FRESH_API_HOSTNAMES.includes(domain)
  );
}

export function isSokoDomain(domain: string) {
  return SOKO_HOSTNAMES.includes(domain) || SOKO_API_HOSTNAMES.includes(domain);
}

/**
 * Get env var for ezifresh/ezisoko
 *
 * If you pass the value `WEBHOOK_SECRET`, this function will return either
 * `FRESH_WEBHOOK_SECRET` or `SOKO_WEBHOOK_SECRET` depending on the hostname.
 */
export function getEnv(req: Request, env: string) {
  const host = req.headers.get("host") as string;
  const domain = host.replace("www.", "").toLowerCase();

  let envKey = env;

  if (isSokoDomain(domain)) {
    envKey = `SOKO_${env}`;
  } else if (isFreshDomain(domain)) {
    envKey = `FRESH_${env}`;
  }

  return process.env[envKey];
}
