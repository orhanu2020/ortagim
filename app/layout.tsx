import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { UserNav } from "./components/UserNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ortagim",
  description: "Ben de varım",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        {children}
        {/* <UserNav /> */}
      </body>
    </html>
  );
}
