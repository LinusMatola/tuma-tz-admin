import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tuma PSP Admin",
  description: "TUMA PSP Admin Control Hub ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
