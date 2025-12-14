import "./globals.css";
import { Bangers } from "next/font/google";

const comicFont = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-comic",
});

export const metadata = {
  title: "MIST BLITZ",
  description: "Official website of MIST BLITZ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${comicFont.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
