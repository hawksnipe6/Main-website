import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nocturnal — Phygital Design Studio',
  description:
    'Product design, brand identity, UX, and 3D visualisation. Nocturnal is a phygital design studio based in Mumbai, working with founders and product teams globally.',
  keywords: ['product design', 'industrial design', 'brand identity', 'UX design', '3D visualisation', 'Mumbai', 'phygital design studio'],
  authors: [{ name: 'Abeer Mahadane' }],
  openGraph: {
    title: 'Nocturnal — Phygital Design Studio',
    description: 'Design that makes your product unforgettable.',
    type: 'website',
    url: 'https://getnctrnl.com',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 300, height: 300, alt: 'Nocturnal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nocturnal — Phygital Design Studio',
    description: 'Design that makes your product unforgettable.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://getnctrnl.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
