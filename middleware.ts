import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { apiClient } from "./components/common/common";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Check if the user is authenticated
  if (!token && req.nextUrl.pathname !== "/user/signin") {
    // Redirect to the sign-in page if not authenticated
    return NextResponse.redirect(new URL("/user/signin", req.url));
  }

  // Allow the request to continue if authenticated
  return NextResponse.next();
}

// Routes where the middleware should apply
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/profile/:path*",
    "/crm/:path*",
    "/catalog/List/:path*",
    "/wishlist/:path*",
    "/rfq/:path*",
    "/seller/:path*",
    "/companySettings/:path*",
    "/subdomain/:path*",
    "/roles/:path*",
    "/sellersubaccount/:path*",
    "/ads/:path*",
    "/pricesettings/:path*",
    "/contacts/:path*",
    "/invite/:path*",
    "/subscription/:path*",
    "/plancards/:path*",
    "/recentactivity/:path*",
    "/notifications",
    "/preferences",
    // "/chat",
    "/crmV1/:path*",
  ],
};
