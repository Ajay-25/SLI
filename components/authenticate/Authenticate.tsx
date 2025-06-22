'use client';
import { useEffect } from 'react';

const Authenticate = () => {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await fetch(
          'https://sangat.sos.org/authtoken.asmx/GetToken',
          {
            method: 'POST',
            credentials: 'include',
          },
        );

        if (response.ok) {
          const data = await response.json();

          if (data.authStatus) {
            document.cookie = `authToken=${data.userId}; Path=/;`;
            console.log('Authenticated');
          } else {
            const currentUrl = window.location.href;
            if (
              currentUrl.indexOf('vercel') > 0 ||
              currentUrl.indexOf('local') > 0
            ) {
              document.cookie = `authToken=2030; Path=/;`;
            } else {
              window.location.href = `https://sangat.sos.org/Forwarder?RedirectTo=${encodeURIComponent(
                currentUrl,
              )}`;
            }
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

  return null;
};

export { Authenticate };
