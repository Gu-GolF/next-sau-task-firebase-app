import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
 
const kanit = Kanit({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
 
export const metadata: Metadata = {
  title: "Manage Task App by GuGolF SAU",
  description: "เว็บแอปพลิเคชันสำหรับจัดการงานที่พัฒนาโดย GuGolF SAU โดยใช้ Next.js, React และ TypeScript",
  keywords: ["Manage Task App", "GuGolF SAU", "Next.js", "React", "TypeScript"],
  authors: [{ name: "GuGolF SAU", url: "https://github.com/GuGolF-SAU" }],
};
 
export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${kanit.className}`} >
        {children}
      </body>
    </html>
  );
};