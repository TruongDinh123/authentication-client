"use client";
import 'katex/dist/katex.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Spin } from "antd";
import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Cookies from "js-cookie";
import { isAdmin } from "@/middleware";

const Providers = dynamic(() => import("@/Provider"), { ssr: false });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  useEffect(() => {
    // Check if the cookie exists
    const token = Cookies.get("Bearer");

    if (!loading) {
      if (!token && pathname !== "/login" && pathname !== "/") {
        router.push("/login");
      } else if (pathname.includes("/admin") && !(isAdmin())) {
        router.push("/unauthorized");
      } else if (token && pathname === "/login") {
        router.push("/");
      }
    }
    setLoading(false);
  }, [pathname, loading]);

  return (
    <html>
      <body>
        <Providers>
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <Spin />
            </div>
          ) : (
            <Suspense fallback={<Spin size="large"></Spin>}>
              <Layout>
                <Layout>
                  <div
                    className={pathname.includes("/admin") ? "" : undefined}
                  >
                    {children}
                  </div>
                </Layout>
              </Layout>
            </Suspense>
          )}
        </Providers>
      </body>
    </html>
  );
}