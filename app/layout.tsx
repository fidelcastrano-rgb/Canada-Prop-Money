import type {Metadata} from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/hooks/use-cart';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Canadian Prop Money | Premium Prop Money Canada for Film, TV & Photography',
  description: 'Buy realistic Canadian Prop Money & Prop Money Canada for film, TV & photography. Ultra-realistic legal Prop Money with premium non-glare coating and COA.',
  metadataBase: new URL('https://canadianpropmoney.org'),
  alternates: {
    canonical: 'https://canadianpropmoney.org/',
  },
  icons: {
    icon: [
      { url: '/logo.webp', type: 'image/webp' },
    ],
    shortcut: '/logo.webp',
    apple: '/logo.webp',
  },
  openGraph: {
    title: 'Canadian Prop Money | Premium Prop Money Canada for Film, TV & Photography',
    description: 'Buy realistic Canadian Prop Money & Prop Money Canada for film, TV & photography. Ultra-realistic legal Prop Money with premium non-glare coating and COA.',
    url: 'https://canadianpropmoney.org',
    siteName: 'Canadian Prop Money',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canadian Prop Money | Premium Prop Money Canada for Film, TV & Photography',
    description: 'Buy realistic Canadian Prop Money & Prop Money Canada for film, TV & photography. Ultra-realistic legal Prop Money with premium non-glare coating and COA.',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-[#0A0A0B] text-[#F5F5F5] min-h-screen selection:bg-[#D91E18] selection:text-white" suppressHydrationWarning>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
