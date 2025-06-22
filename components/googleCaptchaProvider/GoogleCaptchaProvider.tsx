'use client';
import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const GoogleCaptcha = ({ children }: { children: React.ReactNode }) => {
  const reCaptchaKey = process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey ?? 'NOT DEFINED'}>
      {children}
    </GoogleReCaptchaProvider>
  );
};

export { GoogleCaptcha };
