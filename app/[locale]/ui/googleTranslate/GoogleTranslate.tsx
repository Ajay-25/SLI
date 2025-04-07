'use client';

import { useEffect, useState } from 'react';
import { SelectPicker, VStack } from 'rsuite';
import { getCookie, setCookie } from 'cookies-next';

//constants
import { LANGUAGES } from './languages';

//types
import type { ReactElement } from 'react';

export const GoogleTranslate = (): ReactElement => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('/auto/en');

  useEffect(() => {
    try {
      const userLanguage = navigator.language || navigator.languages[0];
      const langCode = userLanguage.split('-')[0]; // Extract base language code (e.g., "en")
      const supportedLanguage = LANGUAGES.find((lang) =>
        lang.value.includes(langCode),
      );

      if (supportedLanguage) {
        setSelectedLanguage(supportedLanguage.value);
      }
    } catch (e) {}

    const script = document.createElement('script');
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'auto',
          autoDisplay: false,
          includedLanguages: LANGUAGES.map(
            (lang) => lang.value.split('/')[2],
          ).join(','), // Extract language codes
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element',
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const cookieLang = getCookie('googtrans') as string;
    if (cookieLang) {
      setSelectedLanguage(cookieLang);
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    setCookie('googtrans', value);
    window.location.reload();
  };

  return (
    <VStack>
      <div
        id="google_translate_element"
        style={{
          display: 'none',
        }}
      ></div>
      <SelectPicker
        data={LANGUAGES}
        style={{ width: 300 }}
        placement="auto"
        size="sm"
        cleanable={false}
        value="/auto/en"
        // searchable={false}
        onSelect={handleLanguageChange}
        placeholder="Select Language"
        className="notranslate"
        menuClassName="notranslate"
      />
    </VStack>
  );
};

export default GoogleTranslate;
