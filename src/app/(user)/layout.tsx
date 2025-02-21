import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";
import SideBar from "@/components/SideBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexMart - Best Online Shopping Experience",
  description: "NexMart is a feature-rich e-commerce platform offering high-quality products with seamless checkout powered by Stripe and Firebase.",
  keywords: ["e-commerce", "online shopping", "buy products", "NexMart", "Next.js", "Sanity", "Firebase", "Stripe"],
  authors: [{ name: "Ausaf Ul Islam", url: "https://ausafulislam-portfolio.vercel.app/" }],
  openGraph: {
    title: "NexMart - Best Online Shopping Experience",
    description: "Shop from NexMart, a Next.js-powered e-commerce store with an easy and secure checkout experience.",
    url: "https://nexmart-ausaf.vercel.app/",
    siteName: "NexMart",
    images: [
      {
        url: "/nexMart-1.png", // Fixed image path
        width: 1200,
        height: 630,
        alt: "NexMart - Your Trusted Online Store",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image", // Fixed issue here
    title: "NexMart - Best Online Shopping Experience",
    description: "Shop from NexMart, a Next.js-powered e-commerce store with an easy and secure checkout experience.",
    images: ["/nexMart-1.png"], // Fixed image path
    creator: "@ausafulislam", 
  },
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
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Ausaf ul Islam" />

        {/* Favicon */}
        <link rel="icon" href="/nexMart-1.png" type="image/x-icon" />

        {/* Open Graph (for social media previews) */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NexMart - Best Online Shopping Experience" />
        <meta property="og:description" content="Shop from NexMart, a Next.js-powered e-commerce store with an easy and secure checkout experience. Built by Ausaf ul Islam." />
        <meta property="og:image" content="/nexMart-1.png" />
        <meta property="og:url" content="https://nexmart-ausaf.vercel.app/" />
        <meta property="og:site_name" content="NexMart" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NexMart - Best Online Shopping Experience" />
        <meta name="twitter:description" content="Shop from NexMart, a Next.js-powered e-commerce store with an easy and secure checkout experience." />
        <meta name="twitter:image" content="/nexMart-1.png" />
        <meta name="twitter:creator" content="@ausafulislam" />

        {/* Google Search Console verification for SEO */}
        <meta name="google-site-verification" content="NaUf690lfIuTZBJkyF-I68rIiX-t0HiZe5xWgUQwNm0" />
      </head>
      <body className={poppins.className}>
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
