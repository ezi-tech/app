import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    "/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

const SOKO_HOSTNAMES = ["ezisoko.shop"];
const FRESH_HOSTNAMES = ["ezifresh.shop"];

export default function middleware(req: NextRequest) {
  const host = req.headers.get("host") as string;
  const domain = host.replace("www.", "").toLowerCase();

  if (SOKO_HOSTNAMES.includes(domain)) {
    return NextResponse.rewrite(new URL("/ezisoko.shop", req.url));
  } else if (FRESH_HOSTNAMES.includes(domain)) {
    return NextResponse.rewrite(new URL("/ezisoko.shop", req.url));
  }
}
