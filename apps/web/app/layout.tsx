import { cn } from "@/lib/utils";
import { Asap, Signika } from "next/font/google";

const asap = Asap({ subsets: ["latin"], variable: "--font-asap" });
const signika = Signika({ subsets: ["latin"], variable: "--font-signika" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(asap.variable, signika.variable, "font-sans")}>
        {children}
      </body>
    </html>
  );
}
