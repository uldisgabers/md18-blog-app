import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import React from "react";
import { HomeAlt1 } from "akar-icons";

const roboto = Roboto({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "BLOG",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <SessionProvider session={session}>
          <main>
            <div className="navigation">
              <Link className="homeIcon" href={"/"}>
                <HomeAlt1 strokeWidth={2} size={36} color="black" />
              </Link>
              <Link className="homeBtn" href={"/"}>
                HOUSE BLOG
              </Link>
            </div>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
