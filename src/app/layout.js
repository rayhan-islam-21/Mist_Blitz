import "./globals.css";
import { Anton, Inter } from "next/font/google";

const headingFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "MIST BLITZ",
  description: "Offical website of Mist BlitZ",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
