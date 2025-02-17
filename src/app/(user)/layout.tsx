import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import SideBar from "@/components/SideBar";


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '700'], 
  style: ['normal', 'italic'], 
  display: 'swap',  
});

export const metadata: Metadata = {
  title: "NexMart E-commerce",
  description: "NexMart is an e-commerce web application built using Next.js, Sanity, Firebase, Stripe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href=
          "../../..//nexMart-1.png"
          type="image/x-icon" />
      </head>
      <body
        className={poppins.className}>
        <Layout>
          <Header />
          {children}
          <Footer />
          <SideBar />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000000",
                color: "#FFFFFF",
              },
            }}
          />
        </Layout>
      </body>
    </html>
  );
}
