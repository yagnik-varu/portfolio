import { NextResponse, type NextRequest } from "next/server";
import { resolvePerspective } from "@/domains/perspective/resolve";
import {
  PERSPECTIVE_COOKIE,
  PERSPECTIVE_COOKIE_MAX_AGE,
  PERSPECTIVE_HEADER,
} from "@/domains/perspective/persistence";
import { perspectiveSchema } from "@/lib/validation/perspective.schema";

/**
 * Runs before every page request (Next 16 "proxy", formerly middleware).
 *
 * Job: decide the perspective once, before rendering, and hand it to the root
 * layout as a request header. This is what lets the server render the correct
 * mode on the first paint instead of always rendering Recruiter and flipping
 * after hydration.
 *
 * It also persists an explicit `?perspective=` choice into the cookie so the
 * next visit remembers it.
 */
export function proxy(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("perspective");
  const cookie = request.cookies.get(PERSPECTIVE_COOKIE)?.value ?? null;

  const perspective = resolvePerspective({
    param,
    pathname: request.nextUrl.pathname,
    cookie,
  });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PERSPECTIVE_HEADER, perspective);

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Remember an explicit, valid URL choice. Invalid values are ignored here
  // (resolvePerspective already fell back) so a bad link can't poison the cookie.
  const validParam = perspectiveSchema.safeParse(param);
  if (validParam.success && validParam.data !== cookie) {
    response.cookies.set({
      name: PERSPECTIVE_COOKIE,
      value: validParam.data,
      path: "/",
      maxAge: PERSPECTIVE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Page routes only: skip Next internals and any file with an extension
  // (favicon.ico, sitemap.xml, robots.txt, resume.pdf, images, fonts).
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
