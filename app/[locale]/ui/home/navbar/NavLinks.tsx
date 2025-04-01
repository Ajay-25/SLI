import { Link } from '@i18n/navigation';
import clsx from 'clsx';

//components
import { HamburgerMenu } from '@/ui/menu';

//hooks
import { usePathname } from '@i18n/navigation';

//hooks
import { useTranslations } from 'next-intl';

const links = [
  { key: 'myProfile', href: '/my-profile' },
  { key: 'courses', href: '/courses' },
  { key: 'faqs', href: '/faqs' },
  { key: 'courseSchedule', href: '/course-schedule' },
  { key: 'contactUs', href: '/contact-us' },
];

export function NavLinks({ className }: { className: string }) {
  const t = useTranslations('Nav');
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
              key={link.key}
              href={link.href}
              className={clsx(
                'flex flex-none cursor-pointer border-0 border-sos-primary-gold p-2.5 px-8 text-20 font-medium hover:text-sos-secondary-blue [&:not(:last-child)]:border-r-[1px]',
                pathname === link.href
                  ? 'text-sos-secondary-blue'
                  : 'text-sos-primary-blue',
              )}
            >
              {t(link.key)}
            </Link>
          );
        })}
      </div>
      <HamburgerMenu links={links} />
    </>
  );
}
