import AuthProvider from "@/context/Authprovider";
import "./globals.css";
import { Russo_One, Manrope, Space_Mono } from "next/font/google";

// Display / headings — bold condensed, very motorsport
const oswald = Russo_One({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

// Body text — clean, readable
const barlow = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

// Technical labels / mono data
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
      <body
        className={`${oswald.variable} ${barlow.variable} ${spaceMono.variable} bg-black text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
