import type { Metadata } from "next";
import { Gelasio, Inknut_Antiqua } from "next/font/google";
import "./globals.css";
import UserSettingsProvider from "./user-settings-provider";
import { Toaster } from "@/components/ui/toaster";

import { cn } from "@/lib/utils";

const gelasio = Gelasio({ subsets: ["latin"] });
const inknut = Inknut_Antiqua({ subsets: ["latin"], weight: "700" });

export const metadata: Metadata = {
  title: "Balderskägg",
  description: "Ett upptäckaräventyr på lindholmen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(gelasio.className, "bg-introBg")}>
        <UserSettingsProvider>{children}</UserSettingsProvider>
        <Toaster />
      </body>
    </html>
  );
}
