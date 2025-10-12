import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  // Protect all routes starting with /admin
  if (path.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //Protect if the user is not an admin
  if (path.startsWith("/admin") && token) {
    try {
      const user = jwtDecode<{ id: string; role: string }>(token);

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
      const user = jwtDecode<{ id: string; role: string }>(token);
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
