import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("in");
  const isAuthenticated = true; // Replace this with your authentication logic

  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next();
  }

  // Redirect to login page if not authenticated
  return NextResponse.redirect(new URL("/start", request.url));
}

export const config = {
  matcher: ["/app/:path*"],
};
