import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserSettingsProvider from "./user-settings-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yrgo Skattjakt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-introBg")}>
        <UserSettingsProvider>{children}</UserSettingsProvider>
      </body>
    </html>
  );
}
