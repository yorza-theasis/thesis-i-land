import type { ReactNode } from 'react';

type IFooterIconListProps = {
  children: ReactNode;
};

const FooterIconList = (props: IFooterIconListProps) => (
  <div className="flex items-center gap-5">{props.children}</div>
);

export { FooterIconList };
