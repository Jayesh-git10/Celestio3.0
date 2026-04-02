import type { Metadata } from "next";
import { Inter, Space_Grotesk, Josefin_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import StarBackground from "@/components/ui/StarBackground";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Celestio 3.0 | Where Technology Dances With Culture",
  description: "The official annual fest of IIIT Ranchi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${josefinSans.variable} antialiased selection:bg-starlight-cyan/30`}>
      <body className="min-h-screen bg-background relative overflow-x-hidden" suppressHydrationWarning>
        <StarBackground />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
