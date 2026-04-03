import AuthProvider from "@/context/Authprovider";
import "./globals.css";
import { Barlow_Condensed, Space_Mono } from "next/font/google";

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata = {
  title: "MIST BLITZ",
  description: "Official website of MIST BLITZ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${spaceMono.variable} bg-black text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
