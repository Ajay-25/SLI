'use client';

import Link from 'next/link';
import clsx from 'clsx';

//components
import { HamburgerMenu } from '@/app/ui/menu';

//hooks
import { usePathname } from 'next/navigation';

const links = [
  { name: 'My Profile', href: '/my-profile'},
  { name: 'Courses', href: '/courses' },
  { name: "FAQ's", href: '/faqs' },
  { name: 'Course Schedule', href: '/course-schedule' },
  { name: 'Contact Us', href: '/contact-us' },
  { name: 'Sign Out', href: '/sign-out' },
];

export function NavLinks({ className }: { className: string }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={clsx(
          'hidden grow items-center justify-end md:flex',
          className,
        )}
      >
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex flex-none cursor-pointer p-2.5 px-8 text-20 font-medium hover:text-sos-secondary-blue border-0 [&:not(:last-child)]:border-r-[1px] border-sos-primary-gold',
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
      <HamburgerMenu links={links} />
    </>
  );
}
