import { Nunito } from "next/font/google";
import type {Metadata} from "next";
import "./globals.css";
const nunito = Nunito({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Cozy-Memory",
  description: "Cozy-Memory",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        {children}
      </body>
    </html>
  );
}
