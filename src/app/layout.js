import "./globals.css";
import { Bangers,Mouse_Memoirs } from "next/font/google";

const comicFont = Mouse_Memoirs({
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
      <body className={`${comicFont.className} bg-black text-white `}>
        
        {children}
      </body>
    </html>
  );
}
