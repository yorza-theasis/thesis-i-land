import { motion } from 'framer-motion';
import Link from 'next/link';

import { Background } from '@/background/Background';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { Section } from '../layout/Section';

const Banner = () => (
  <Background withGlow>
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <CTABanner
          title="Let's build something remarkable."
          subtitle="Tell us about your project."
          button={
            <Link href="/contact/">
              <Button xl>Contact Us</Button>
            </Link>
          }
        />
      </motion.div>
    </Section>
  </Background>
);

export { Banner };
