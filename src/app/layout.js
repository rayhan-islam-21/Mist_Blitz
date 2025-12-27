import AuthProvider from "@/context/Authprovider";
import "./globals.css";
import { Mouse_Memoirs, Cousine } from "next/font/google";

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
      <body className={`${comicFont.className} bg-black text-white`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}



