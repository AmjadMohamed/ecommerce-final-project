import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Navbar from "./_components/Navbar/Navbar";
import 'swiper/css';
import 'swiper/css/pagination';
import { Toaster } from "sonner";
import Providers from "@/Providers";
import Footer from "./_components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - Your Online Grocery Store",
  description: "Shop fresh groceries and household essentials online with fast delivery",
  icons: {
    icon: "/Assets/screens/basket-logo.svg",
    shortcut: "/Assets/screens/basket-logo.svg",
    apple: "/Assets/screens/basket-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Toaster />
          <Navbar />
          {children}
          <Footer />
        </Providers>

      </body>
    </html>
  );
}
