'use client';

import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Install react-icons if not already done: npm install react-icons
import Link from 'next/link';
import { SectionSeparator } from '@/ui/home/SectionSeparator';

//hooks
import { usePathname } from 'next/navigation';

//types
import type { Link as LinkType } from '@/ui/types/links';
import clsx from 'clsx';
import Image from 'next/image';

const HamburgerMenu = ({ links }: { links: LinkType[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Toggle Sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex">
      {/* Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className="items-center p-2 text-3xl text-sos-primary-gold focus:outline-none md:hidden"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-white text-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-2">
          <Link
            className="flex h-full items-center justify-center"
            href="/home"
            onClick={toggleSidebar}
          >
            <Image
              src="/home/home-logo.webp"
              width={24}
              height={24}
              className="block"
              alt="Service Leadership Institute text with logo"
            />
          </Link>

          <button
            onClick={toggleSidebar}
            className="text-3xl text-sos-primary-gold focus:outline-none md:hidden "
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <SectionSeparator />
        {/* Sidebar Menu Items */}
        <ul className="flex flex-col space-y-4 p-4">
          {links.map((link) => {
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx(
                    'flex flex-none cursor-pointer p-2.5 text-16 font-medium hover:text-sos-secondary-blue',
                    pathname === link.href
                      ? 'text-sos-secondary-blue'
                      : 'text-sos-primary-blue',
                  )}
                  onClick={toggleSidebar}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/*/!* Overlay (optional for UX) *!/*/}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar} // Close sidebar when clicking outside
        ></div>
      )}
    </div>
  );
};

export { HamburgerMenu };
