import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const serif = Noto_Serif_KR({
  weight: ["300", "400", "600"],
  variable: "--font-serif-kr",
  display: "swap",
  preload: false,
});

const sans = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans-kr",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: { default: "HAYUL 하율 — Botanical Skincare", template: "%s — HAYUL" },
  description: "한국의 식물에서 찾은 스킨케어, 하율. (포트폴리오용 가상 브랜드)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${serif.variable} ${sans.variable}`}>
      <body className="font-sans">
        <Providers>
          <Preloader />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
