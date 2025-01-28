import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Astralis",
  description: "Your universe of possibilities, all-in-one workspace to create, organize, and collaborate like never before."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
    <body>
        <Header/>
        <div className="flex min-h-screen">
          <SideBar/>
          <div className="flex-1 bg-darkPurple overflow-y-auto overflow-hidden scrollbar-hide"> {children} </div>
        </div>
        <Toaster position="top-center"/>
      </body>
    </html>
    </ClerkProvider>
  );
}
