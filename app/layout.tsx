import '@/app/ui/global.css';
import { futuraFont } from '@/app/ui/fonts';

//components
import { Navbar } from '@/app/ui/home/navbar';

//types
import { ReactNode } from 'react';
import { Metadata } from 'next';

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${futuraFont.className} antialiased`}>
        <HomeLayout>{children}</HomeLayout>
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
