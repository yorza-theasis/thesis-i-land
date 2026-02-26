import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
import { Section } from '../layout/Section';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';
import { ThemeToggle } from '../navigation/ThemeToggle';
import { Logo } from './Logo';

const Hero = () => (
  <>
    {/* 1. Хедер тепер винесений ЗА межі Background. 
        Він більше не блокується іншими секціями і має z-[100] для надійності. */}
    <header className="fixed inset-x-0 top-0 z-[100] w-full border-b border-gray-200/50 bg-white/70 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-700/70">
      <Section yPadding="py-4">
        <NavbarTwoColumns logo={<Logo xl />} themeToggle={<ThemeToggle />}>
          <li>
            <Link href="#services">Services</Link>
          </li>
          <li>
            <Link href="#cases">Cases</Link>
          </li>
          <li>
            <Link href="#team">Team</Link>
          </li>
          <li>
            <Link href="/contact/">Contact</Link>
          </li>
        </NavbarTwoColumns>
      </Section>
    </header>

    {/* 2. Фон та контент Hero тепер йдуть окремо. */}
    <Background color="bg-white dark:bg-gray-700" withGlow>
      {/* Трохи збільшив відступ до pt-40, щоб контент точно не ховався під меню */}
      <Section yPadding="pt-40 pb-32">
        <HeroOneButton
          title={
            <>
              {'Engineering Excellence,\n'}
              <span className="text-primary-500">Delivered.</span>
            </>
          }
          description={
            <>
              A Lviv-based software studio with 5+ years of experience each,
              building scalable mobile and <br />
              full-stack solutions for clients worldwide.
            </>
          }
          button={
            <Link href="/contact/">
              <Button xl>Get in Touch</Button>
            </Link>
          }
        />
      </Section>
    </Background>
  </>
);

export { Hero };
