import '@styles/global.css';
import { futuraFont } from '@lib/fonts';

import { NextIntlClientProvider } from 'next-intl';

//components
import { Authenticate } from '@components/authenticate';

//components
import { Navbar } from '@components/home/navbar';

//types
import type { ReactNode } from 'react';

type Params = Promise<{ locale: string }>;

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

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  console.log(locale);
  return {
    title: {
      template: 'SLI | %s',
      default: 'SLI',
    },
    description:
      'Discover the art of effective meeting management, loving communication, and the essentials of service leadership',
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
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
