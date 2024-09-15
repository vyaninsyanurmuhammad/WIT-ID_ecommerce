import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";
import { Toaster } from "@/components/ui/toaster";
import ReduxProvider from "@/redux/provider";
import GsapLayout from "@/components/gsap.layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const rubik = localFont({
  src: "./fonts/RubikVF.ttf",
  variable: "--font-rubik-sans",
  weight: "300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "WIT ecommerce",
  description:
    "Temukan koleksi produk berkualitas tinggi di WIT ecommerce. Dari pakaian trendi hingga elektronik mutakhir, kami menawarkan berbagai pilihan yang memenuhi kebutuhan Anda. Nikmati penawaran terbaik dan pengalaman belanja yang menyenangkan dengan layanan pelanggan yang ramah dan pengiriman cepat. Jelajahi WIT ecommerce hari ini dan temukan produk yang tepat untuk Anda!",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          rubik.variable,
          "antialiased",
        )}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <GsapLayout>{children}</GsapLayout>
            </ThemeProvider>
          </QueryProvider>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
