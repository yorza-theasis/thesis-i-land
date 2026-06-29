import type { ReactNode } from 'react';

import { FooterCopyright } from './FooterCopyright';
import { FooterIconList } from './FooterIconList';

type ICenteredFooterProps = {
  logo: ReactNode;
  iconList: ReactNode;
  children: ReactNode;
};

const CenteredFooter = (props: ICenteredFooterProps) => (
  <div className="text-center">
    {props.logo}

    <nav>
      <ul className="navbar mt-6 flex flex-row justify-center gap-8 text-sm font-medium text-gray-500">
        {props.children}
      </ul>
    </nav>

    <div className="mt-8 flex justify-center">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div>

    <div className="mt-8 text-xs text-gray-600">
      <FooterCopyright />
    </div>

    <style jsx>
      {`
        .navbar :global(li a) {
          transition: color 0.2s ease;
        }
        .navbar :global(li a:hover) {
          color: #e5b5ff;
        }
      `}
    </style>
  </div>
);

export { CenteredFooter };
