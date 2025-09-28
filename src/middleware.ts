import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IUser } from "./interfaces/authInterfaces";
import { jwtVerify } from "jose";
import { jwtSecret } from "./config";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const path = req.nextUrl.pathname;

  // Protect all routes starting with /admin
  if (path.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Protect if the user is not an admin
  if (path.startsWith("/admin") && token) {
    try {
      const secret = new TextEncoder().encode(jwtSecret);

      const { payload } = await jwtVerify<IUser>(token, secret);

      const user = payload as IUser;

      if (!user || user.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect user routes
  const protectedRoutes = ["/cart", "/checkout", "/profile"];

  if (protectedRoutes.some((route) => path.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Protect if the user is not an admin
  if (protectedRoutes.some((route) => path.startsWith(route)) && token) {
    try {
      const secret = new TextEncoder().encode(jwtSecret);

      const { payload } = await jwtVerify<IUser>(token, secret);

      const user = payload as IUser;

      if (!user || user.role !== "CUSTOMER") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } catch (err) {
      console.error("JWT verification failed:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If the check passes, or it's not an admin route, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/cart", "/checkout", "/profile/:path*"],
};
