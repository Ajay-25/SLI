'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState('English');
  const [languages, setLanguages] = useState([
    { label: 'English', href: '' },
    { label: 'Español', href: '' },
  ]);

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setLanguages([
      { label: 'English', href: `${origin}/en/home` },
      { label: 'Español', href: `${origin}/es/home` },
    ]);
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/es')) {
      setCurrentLang('Español');
    } else {
      setCurrentLang('English');
    }
  }, [pathname]);

  const handleLanguageChange = (lang: { label: string; href: string }) => {
    window.location.href = lang.href;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-72 items-center justify-between border border-yellow-400 px-4 py-2 text-lg font-medium text-sos-primary-blue hover:text-sos-secondary-blue"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {/* Globe Icon */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1331_2475)">
            <path
              d="M17.6875 13C17.6875 14.084 17.6289 15.1289 17.5264 16.125H8.47852C8.37109 15.1289 8.31738 14.084 8.31738 13C8.31738 11.916 8.37598 10.8711 8.47852 9.875H17.5264C17.6338 10.8711 17.6875 11.916 17.6875 13ZM19.0938 9.875H25.1045C25.3633 10.876 25.5 11.9209 25.5 13C25.5 14.0791 25.3633 15.124 25.1045 16.125H19.0938C19.1963 15.1191 19.25 14.0742 19.25 13C19.25 11.9258 19.1963 10.8809 19.0938 9.875ZM24.5918 8.3125H18.8936C18.4053 5.19238 17.4385 2.58008 16.1934 0.910156C20.0166 1.9209 23.127 4.69434 24.5869 8.3125H24.5918ZM17.3115 8.3125H8.68848C8.98633 6.53516 9.44531 4.96289 10.0068 3.68848C10.5195 2.53613 11.0908 1.70117 11.6426 1.17383C12.1895 0.65625 12.6436 0.5 13 0.5C13.3564 0.5 13.8105 0.65625 14.3574 1.17383C14.9092 1.70117 15.4805 2.53613 15.9932 3.68848C16.5596 4.95801 17.0137 6.53027 17.3115 8.3125ZM7.10645 8.3125H1.4082C2.87305 4.69434 5.97852 1.9209 9.80664 0.910156C8.56152 2.58008 7.59473 5.19238 7.10645 8.3125ZM0.895508 9.875H6.90625C6.80371 10.8809 6.75 11.9258 6.75 13C6.75 14.0742 6.80371 15.1191 6.90625 16.125H0.895508C0.636719 15.124 0.5 14.0791 0.5 13C0.5 11.9209 0.636719 10.876 0.895508 9.875ZM10.0068 22.3066C9.44043 21.0371 8.98633 19.4648 8.68848 17.6875H17.3115C17.0137 19.4648 16.5547 21.0371 15.9932 22.3066C15.4805 23.459 14.9092 24.2939 14.3574 24.8213C13.8105 25.3438 13.3564 25.5 13 25.5C12.6436 25.5 12.1895 25.3438 11.6426 24.8262C11.0908 24.2988 10.5195 23.4639 10.0068 22.3115V22.3066ZM7.10645 17.6875C7.59473 20.8076 8.56152 23.4199 9.80664 25.0898C5.97852 24.0791 2.87305 21.3057 1.4082 17.6875H7.10645ZM24.5918 17.6875C23.127 21.3057 20.0215 24.0791 16.1982 25.0898C17.4434 23.4199 18.4053 20.8076 18.8984 17.6875H24.5967H24.5918Z"
              fill="#032B4A"
            />
          </g>
          <defs>
            <clipPath id="clip0_1331_2475">
              <rect
                width="25"
                height="25"
                fill="white"
                transform="translate(0.5 0.5)"
              />
            </clipPath>
          </defs>
        </svg>

        <span className="text-[20px] text-xl font-medium text-sos-primary-gold">
          {currentLang}
        </span>

        {/* Downward chevron */}
        <svg
          width="26"
          height="16"
          viewBox="0 0 26 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.7393 14.6189C12.4366 15.3162 13.569 15.3162 14.2663 14.6189L24.977 3.90819C25.6743 3.21088 25.6743 2.07845 24.977 1.38114C24.2797 0.683827 23.1473 0.683827 22.45 1.38114L13 10.8311L3.55004 1.38672C2.85273 0.689405 1.72029 0.689405 1.02298 1.38672C0.325672 2.08403 0.325672 3.21646 1.02298 3.91377L11.7337 14.6245L11.7393 14.6189Z"
            fill="#1C6EAA"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border border-yellow-400 bg-white shadow-lg">
          <ul className="divide-y divide-sos-primary-blue">
            {languages.map((lang) => (
              <li
                key={lang.label}
                onClick={() => handleLanguageChange(lang)}
                className={clsx(
                  'hover:bg-sos-secondary-gold cursor-pointer px-4 py-3 text-center text-[20px] text-xl font-medium text-sos-primary-blue',
                  currentLang === lang.label && 'font-bold',
                )}
              >
                {lang.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
