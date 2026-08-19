import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PIYALO - Conecta con Técnicos Locales en Santa Cruz',
  description: 'Encuentra técnicos confiables para electricidad, plomería, aire acondicionado y más en Santa Cruz de la Sierra, Bolivia.',
  keywords: 'técnicos, Santa Cruz, Bolivia, electricidad, plomería, aire acondicionado, servicios',
  openGraph: {
    title: 'PIYALO - Conecta con Técnicos Locales en Santa Cruz',
    description: 'Encuentra técnicos confiables para electricidad, plomería, aire acondicionado y más en Santa Cruz de la Sierra, Bolivia.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://piyalo.com',
    siteName: 'PIYALO',
    locale: 'es_BO',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://piyalo.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
