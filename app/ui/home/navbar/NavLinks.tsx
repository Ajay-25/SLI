'use client';

import Link from 'next/link';
import clsx from 'clsx';

//hooks
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Courses', href: '/courses' },
  { name: "FAQ's", href: '/faqs' },
  { name: 'Course Schedule', href: '/course-schedule' },
  { name: 'Contact Us', href: '/contact-us' },
];

export function NavLinks({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <div className={clsx('flex grow items-center justify-end', className)}>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex flex-none cursor-pointer p-2.5 text-24 font-medium hover:text-sos-secondary-blue',
              pathname === link.href
                ? 'text-sos-secondary-blue'
                : 'text-sos-primary-blue',
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
