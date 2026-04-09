import AuthProvider from "@/context/Authprovider";
import "./globals.css";
import { Exo_2, IBM_Plex_Sans, Space_Mono } from "next/font/google";

// Display / headings — bold condensed, very motorsport
const oswald = Exo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-oswald",
  display: "swap",
});

// Body text — clean, readable
const barlow = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
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
