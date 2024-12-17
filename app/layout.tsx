'use client';
import '@/app/ui/global.css';
import { futuraFont } from '@/app/ui/fonts';
import { useEffect } from 'react';

import axios from 'axios';

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
    const handleLogin = async () => {
      try {
        const response = await axios.post(
          'https://sangat.sos.org/authtoken.asmx/GetToken',
          {}, // Empty payload for this request
          {
            withCredentials: true, // Include cookies with the request
            headers: {
              'origin': 'https://sangat.sos.org', // Set the request origin
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          },
        );

        let data = response.data;

        // If the response is a JSON string, parse it
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }

        if (data.authStatus) {
          // authStatus is true: perform successful login actions
          // e.g., navigate to a landing page, display user-specific content
          console.log('Login successful:', data);
        } else {
          // authStatus is false: handle error scenario
          // e.g., navigate to an error page or show an error message
          console.error('Login failed: Invalid credentials or session expired');
          const currentUrl = window.location.href;

          window.location.href = `https://sangat.sos.org/Forwarder?RedirectTo=${encodeURIComponent(
            currentUrl,
          )}`;
        }
      } catch (error) {
        console.error('Error during login:', error);
        // Handle network or server errors here
      }
    };

    handleLogin();
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
