import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Script from "next/script"

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "SB Management",
  description: "Unlock Premium Solutions. Professional. Streamlined.",
  generator: 'v0.dev',
  metadataBase: new URL('https://sbmgmt.co'), // Updated to actual domain
  openGraph: {
    title: "SB Management",
    description: "Professional solutions tailored to meet your unique requirements.",
    url: 'https://sbmgmt.co', // Updated to actual domain
    siteName: 'SB Management',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SB Management',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  verification: {
    google: 'Yrjv8jcocZ6gu627XszsbbRbBcdybpfgs6c6DfkcJKk',
  },
  alternates: {
    canonical: 'https://sbmgmt.co',
    types: {
      'application/xml+sitemap': [
        {
          url: 'sitemap.xml',
          title: 'Sitemap',
        },
      ],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SB Management',
    description: 'Professional solutions tailored to meet your unique requirements.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/main-icon.png', sizes: 'any' }, // Using the cleaner main icon as primary favicon
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/favicon-196x196.png', sizes: '196x196', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-touch-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-touch-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-touch-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-touch-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-touch-icon-167x167.png', sizes: '167x167' },
      { url: '/apple-touch-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      { rel: 'msapplication-TileColor', url: '#FFFFFF' },
      { rel: 'msapplication-TileImage', url: '/mstile-144x144.png' },
      { rel: 'msapplication-square70x70logo', url: '/mstile-70x70.png' },
      { rel: 'msapplication-square150x150logo', url: '/mstile-150x150.png' },
      { rel: 'msapplication-wide310x150logo', url: '/mstile-310x150.png' },
      { rel: 'msapplication-square310x310logo', url: '/mstile-310x310.png' },
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-354H2J10W6" 
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            gtag('config', 'G-354H2J10W6');
          `}
        </Script>
        
        {/* JSON-LD for structured data */}
        <Script id="schema-structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SB Management",
              "url": "https://sbmgmt.co",
              "logo": "https://sbmgmt.co/main-icon.png",
              "sameAs": [
                "https://www.facebook.com/sbmanagement",
                "https://twitter.com/sbmanagement",
                "https://www.instagram.com/sbmanagement"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+16305460465",
                "contactType": "customer support",
                "availableLanguage": "English"
              },
              "description": "Professional solutions tailored to meet your unique requirements."
            }
          `}
        </Script>
        
        {/* Primary Favicon - Use the cleaner main-icon.png */}
        <link rel="shortcut icon" href="/main-icon.png" />
        <link rel="icon" href="/main-icon.png" />
        
        {/* Existing Apple Touch Icons and other favicons */}
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon-precomposed" sizes="167x167" href="/apple-touch-icon-167x167.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/favicon-128x128.png" sizes="128x128" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="application-name" content="SB Management"/>
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/mstile-310x310.png" />
      </head>
      <body className="font-sans bg-background text-foreground bg-main-gradient min-h-screen">
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
        
        {/* Gradient background elements */}
        <div className="fixed inset-0 -z-10 bg-main-gradient"></div>
        <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 -z-10 bg-accent/5 rounded-full blur-3xl floating-element"></div>
        <div
          className="fixed bottom-1/4 right-1/4 w-1/3 h-1/3 -z-10 bg-primary/5 rounded-full blur-3xl floating-element"
          style={{ animationDelay: "2s" }}
        ></div>
      </body>
    </html>
  )
}