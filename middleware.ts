import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { ProfileType } from "@prisma/client";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest, _next: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const onlyTravelerRoutes = ["/custom-plan"];
  const onlyBusinessRoutes = ["/business"];

  const matchesTravellerPath = onlyTravelerRoutes.some((path) =>
    pathname.startsWith(path)
  );

  const matchesBusinessPath = onlyBusinessRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (matchesTravellerPath) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/signin`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.profileType !== ProfileType.Traveller) {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  } else if (matchesBusinessPath) {
    const token = await getToken({ req: request });
    if (!token) {
      const url = new URL(`/signin`, request.url);
      url.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    if (token.profileType !== ProfileType.Business) {
      const url = new URL(`/403`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
