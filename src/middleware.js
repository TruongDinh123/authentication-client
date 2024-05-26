import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, origin } = request?.nextUrl;
  const session = request?.cookies.get("Bearer");
  if (pathname.includes("/admin")) {
    if (!session) return NextResponse.redirect(`${origin}/login`);
  }
}

export function isAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.roles?.some(role => role.name === "Admin" || role.name === "Super-Admin");
}