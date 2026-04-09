import AuthProvider from "@/context/Authprovider";
import "./globals.css";
import { Viga } from "next/font/google";

// Display / headings — bold condensed, very motorsport
const oswald = Viga({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-oswald",
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
        className={`${oswald.variable} bg-black text-white`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
