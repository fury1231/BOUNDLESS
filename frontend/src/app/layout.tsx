import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "無垠科技 | Boundless Tech",
  description: "智識無界，創新無垠 - Beyond Boundaries. Architecting the Infinite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="antialiased bg-zinc-950 text-zinc-200">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
