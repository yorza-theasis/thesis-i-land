import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type ICTABannerProps = {
  title: string;
  subtitle: string | ReactNode;
  button: ReactNode;
};

const HudCorners = () => (
  <>
    <span className="hud-tl" aria-hidden="true" />
    <span className="hud-tr" aria-hidden="true" />
    <span className="hud-bl" aria-hidden="true" />
    <span className="hud-br" aria-hidden="true" />
  </>
);

const CTABanner = (props: ICTABannerProps) => (
  <div className="border-white/8 relative rounded-3xl border bg-kosmos-900 p-16 text-center">
    <HudCorners />
    {/* Dot grid bg — sized to inset-0, so it never needs clipping */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />

    {/* Center glow — no overflow-hidden on the card, so these bleed past
        its rounded border instead of getting flattened at the edge */}
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="bg-neon-purple/14 size-[700px] rounded-full blur-[130px]" />
    </div>
    <div className="bg-neon-blue/8 pointer-events-none absolute left-1/4 top-0 size-[400px] -translate-x-1/2 rounded-full blur-[100px]" />

    {/* Animated scan line — kept within 0%–100% since nothing clips it now */}
    <motion.div
      className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-purple/45 to-transparent"
      initial={{ top: '0%' }}
      animate={{ top: '100%' }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 2.5,
      }}
    />

    {/* Border top accent */}
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/40 to-transparent" />

    <div className="relative z-10">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neon-purple-bright/55"
      >
        <span className="h-px w-5 bg-neon-purple/50" />
        Start a project
        <span className="h-px w-5 bg-neon-purple/50" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4 text-4xl font-bold tracking-tightest text-white md:text-5xl"
      >
        {props.title}
      </motion.h2>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3 text-lg font-medium text-neon-purple-bright/75"
      >
        {props.subtitle}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.24 }}
        className="mb-10 font-mono text-sm text-gray-600"
      >
        Response within 24h · yorza@thesis-i.com
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {props.button}
      </motion.div>
    </div>
  </div>
);

export { CTABanner };
