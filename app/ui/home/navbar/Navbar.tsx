import Link from 'next/link';

//components
import { NavLinks } from './NavLinks';
import Image from 'next/image';

export function Navbar() {
  return (
    <div className="flex h-[9.8rem] justify-between px-[14.2rem] shadow-xl">
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
  );
}
