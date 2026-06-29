import Link from 'next/link';
import type { ReactNode } from 'react';

type INavbarProps = {
  logo: ReactNode;
  children: ReactNode;
  themeToggle?: ReactNode;
};

const NavbarTwoColumns = (props: INavbarProps) => (
  <div className="flex flex-wrap items-center justify-between">
    <div>
      <Link href="/">{props.logo}</Link>
    </div>

    <nav>
      <ul className="navbar flex items-center gap-6 text-sm font-medium">
        {props.children}
      </ul>
    </nav>

    {props.themeToggle}
  </div>
);

export { NavbarTwoColumns };
