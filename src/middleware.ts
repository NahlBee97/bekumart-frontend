import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { deleteCookie } from "cookies-next";

interface UserPayload {
  id: string;
  role: "ADMIN" | "CUSTOMER";
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value as string;
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/product"];

  const isPublicPath = publicPaths.some(
    (path) =>
      pathname === path || (path !== "/" && pathname.startsWith(path + "/"))
  );

  if (isPublicPath && !token) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let user: UserPayload;

  try {
    user = jwtDecode<UserPayload>(token);
  } catch (err) {
    console.error("Invalid token:", err);
    deleteCookie("token");
    return;
  }

  const isAdmin = user.role === "ADMIN";
  const isCustomer = user.role === "CUSTOMER";

  const protectedRoutes = ["/cart", "/checkout", "/profile", "/admin"];
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const customerRoutes = ["/cart", "/checkout", "/profile"];
  if (isAdmin && customerRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isCustomer && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdmin && pathname === "/") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/cart", "/checkout", "/profile/:path*"],
};
