import { motion } from 'framer-motion';
import Link from 'next/link';

import { Button } from '../button/Button';
import { CTABanner } from '../cta/CTABanner';
import { useT } from '../i18n/LocaleContext';
import { Section } from '../layout/Section';

const Banner = () => {
  const { banner } = useT();

  return (
    <Section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <CTABanner
          title={banner.title}
          subtitle={banner.subtitle}
          button={
            <Link href="/contact/">
              <Button xl>{banner.cta}</Button>
            </Link>
          }
        />
      </motion.div>
    </Section>
  );
};

export { Banner };
