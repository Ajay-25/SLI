import Link from 'next/link';
import clsx from 'clsx';

//hooks
import { usePathname } from 'next/navigation';

//components
import { NavLinks } from './NavLinks';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const isDisabled = pathname.includes('/not-available');

  return (
    <div
      className={clsx(
        isDisabled ? 'pointer-events-none cursor-not-allowed opacity-25' : '',
      )}
    >
      <div className="hidden h-[9.8rem] grow justify-between px-[14.2rem] shadow-xl md:flex">
        <Link className="flex h-full items-center justify-center" href="/home">
          <Image
            src="/home/home-logo.webp"
            width={94}
            height={94}
            className="block shadow-lg"
            alt="Service Leadership Institute text with logo"
          />
        </Link>
        <NavLinks className="h-[9.8rem]" />
      </div>
      <div className="flex h-[3.5rem] grow justify-between px-[4.8rem] shadow-xl md:hidden">
        <Link className="flex h-full items-center justify-center" href="/home">
          <Image
            src="/home/home-logo.webp"
            width={32}
            height={32}
            className="block shadow-lg"
            alt="Service Leadership Institute text with logo"
          />
        </Link>
        <NavLinks className="h-[3.5rem]" />
      </div>
    </div>
  );
}
