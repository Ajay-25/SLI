import '@/ui/global.css';
import { futuraFont } from '@/ui/fonts';

import { NextIntlClientProvider } from 'next-intl';

//components
import { Authenticate } from '@/ui/authenticate';

//components
import { Navbar } from '@/ui/home/navbar';

//types
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <div className="w-full flex-none">
        <Navbar />
      </div>
      <div className="relative flex-grow overflow-y-auto">{children}</div>
    </div>
  );
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body className={`${futuraFont.className} antialiased`}>
        <NextIntlClientProvider>
          <HomeLayout>{children}</HomeLayout>
          <Authenticate />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: 'SLI | %s',
    default: 'SLI',
  },
  description:
    'Discover the art of effective meeting management, loving communication, and the essentials of service leadership',
};
