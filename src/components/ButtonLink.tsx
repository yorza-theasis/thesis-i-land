import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'inverse';
type IconName = 'arrow' | 'down';

const base =
  'group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-[0.9375rem] font-medium transition-[transform,background-color,border-color,color] duration-300 ease-spring active:scale-[0.98]';

/* primary: solid brand blue, the one loud element per view.
 * inverse: white pill for use on the blue CTA block. */
const variants: Record<Variant, string> = {
  primary:
    'bg-signal-strong text-white shadow-[0_8px_24px_-10px_rgb(var(--signal-strong)/0.7)] hover:bg-[#0062cc]',
  secondary:
    'border border-line/15 text-ink hover:border-line/30 hover:bg-line/[0.04]',
  inverse: 'bg-white text-[#0b1b33] hover:bg-white/90',
};

const iconWrap: Record<Variant, string> = {
  primary: 'bg-white/15 text-white',
  secondary: 'bg-line/[0.08] text-ink',
  inverse: 'bg-signal-strong text-white',
};

const buttonClassName = (variant: Variant = 'primary', className = '') =>
  `${base} ${variants[variant]} ${className}`;

type ButtonContentProps = {
  children: ReactNode;
  variant?: Variant;
  icon?: IconName;
};

/* Button-in-button: the trailing icon sits in its own circle and nudges
 * diagonally on hover. Shared by links and the contact form's submit. */
const ButtonContent = ({
  children,
  variant = 'primary',
  icon = 'arrow',
}: ButtonContentProps) => {
  const Icon = icon === 'down' ? ArrowDown : ArrowUpRight;
  const motionClass =
    icon === 'down'
      ? 'group-hover:translate-y-0.5'
      : 'group-hover:-translate-y-px group-hover:translate-x-0.5';
  return (
    <>
      <span>{children}</span>
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ease-spring group-hover:scale-105 ${motionClass} ${iconWrap[variant]}`}
      >
        <Icon size={16} weight="regular" aria-hidden="true" />
      </span>
    </>
  );
};

type ButtonLinkProps = ButtonContentProps & {
  href: string;
  className?: string;
  external?: boolean;
};

const ButtonLink = ({
  href,
  children,
  variant = 'primary',
  icon,
  className,
  external,
}: ButtonLinkProps) => {
  const classes = buttonClassName(variant, className);
  const content = (
    <ButtonContent variant={variant} icon={icon}>
      {children}
    </ButtonContent>
  );

  if (external || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
};

export { buttonClassName, ButtonContent, ButtonLink };
