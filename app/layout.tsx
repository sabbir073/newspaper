import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-serif-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "দৈনিক প্রতিদিন — বাংলাদেশের আধুনিক অনলাইন সংবাদপত্র",
  description:
    "দৈনিক প্রতিদিন — বাংলাদেশের সবচেয়ে আধুনিক ও বিশ্বস্ত অনলাইন সংবাদপত্র। জাতীয়, আন্তর্জাতিক, খেলা, বিনোদন, প্রযুক্তি ও আরও অনেক খবর পড়ুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={notoSerifBengali.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
