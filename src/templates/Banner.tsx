import Link from 'next/link';

import { Background } from '@/background/Background';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';

const Banner = () => {
  const styles = `
    @keyframes shineText {
      /* Починаємо з 100% (блиск захований далеко зліва) 
         і рухаємо до 0% (блиск пролітає і ховається далеко справа) */
      0% { background-position: 100% center; }
      20% { background-position: 0% center; }
      100% { background-position: 0% center; }
    }
    
    .text-shine {
      background: linear-gradient(
        120deg,
        currentColor 0%,
        currentColor 40%,
        #ffffff 50%, /* Блиск */
        currentColor 60%,
        currentColor 100%
      );
      /* Збільшуємо ширину фону до 300%, щоб у нього був великий "запас" по краях */
      background-size: 300% auto;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shineText 6s ease-in-out infinite;
    }

    @keyframes shineBtn {
      0%, 15% { left: -100%; }
      35%, 100% { left: 200%; }
    }
    
    .btn-shine-wrapper {
      position: relative;
      display: inline-flex;
      overflow: hidden;
      border-radius: 0.5rem;
    }
    
    .btn-shine-wrapper::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25deg);
      animation: shineBtn 6s ease-in-out infinite;
      pointer-events: none;
      z-index: 10;
    }
  `;

  return (
    <Background color="bg-white dark:bg-gray-900" withGlow>
      <style>{styles}</style>
      <Section id="contact">
        <CTABanner
          title="Ready to build something great?"
          subtitle={
            <span className="text-shine inline-block">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Let's talk about your project.
            </span>
          }
          button={
            <div className="btn-shine-wrapper">
              <Link href="/contact/">
                <Button>Contact Us</Button>
              </Link>
            </div>
          }
        />
      </Section>
    </Background>
  );
};

export { Banner };
