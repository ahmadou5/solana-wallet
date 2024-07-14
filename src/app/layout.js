import { Inter, Medula_One } from "next/font/google";
import "./globals.css";
import { MiniContextProvider } from "@/context/AppContext";
import Script from "next/script";
const inter = Medula_One({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script  src="https://telegram.org/js/telegram-web-app.js"></Script>
      <MiniContextProvider>
        <body className={inter.className}>{children}</body>
      </MiniContextProvider>
    </html>
  );
}
