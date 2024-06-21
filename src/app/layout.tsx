import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';
import '@/styles/firework.scss';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { siteConfig } from '@/constant/config';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useLocalStorage from 'use-local-storage';
import NextTopLoader from 'nextjs-toploader';

// !STARTERCONF Change these default meta
// !STARTERCONF Look at @/constant/config to change them
export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  // !STARTERCONF this is the default favicon, you can generate your own from https://realfavicongenerator.net/
  // ! copy to /favicon folder
  icons: {
    icon: '/AvinesiaFlag.png',
    shortcut: '/AvinesiaFlag.png',
    apple: '/AvinesiaFlag.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html>
      <body className='bg-dark'>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
