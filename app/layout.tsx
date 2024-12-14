'use client';
import '@/app/ui/global.css';
import { futuraFont } from '@/app/ui/fonts';
import { useEffect } from 'react';

//components
import { Navbar } from '@/app/ui/home/navbar';

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

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(
          'https://sangat.sos.org/authtoken.asmx/GetToken',
          {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              origin: 'https://sangat.sos.org',
            },
            body: JSON.stringify({}),
          },
        );

        if (response.ok) {
          const data = await response.json();

          if (data.authStatus) {
            document.cookie = `authToken=${data.authToken}; Path=/;`;
            console.log('data with status:', data);
          } else {
            const currentUrl = window.location.href;

            window.location.href = `https://sangat.sos.org/Forwarder?RedirectTo=${encodeURIComponent(
              currentUrl,
            )}`;
          }
        } else {
          console.log('Authentication failed');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    authenticate();
  }, []);

  return (
    <html lang="en">
      <body className={`${futuraFont.className} antialiased`}>
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
}

// export const metadata: Metadata = {
//   title: {
//     template: 'SLI | %s',
//     default: 'SLI',
//   },
//   description:
//     'Discover the art of effective meeting management, loving communication, and the essentials of service leadership',
// };
