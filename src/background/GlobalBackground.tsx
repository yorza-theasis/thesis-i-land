/* One shared backdrop for an entire page — fixed to the viewport so its grid
 * never restarts its phase at a section boundary the way a per-section
 * background did (that's what caused the grid cells to visibly misalign
 * where two sections met). Render it once per page, then let every section
 * stay transparent so this shows through everywhere. */
const GlobalBackground = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-kosmos-950"
  >
    {/* Animated grid — drifts slowly and breathes, reads as a live system
        rather than a static texture */}
    <div
      className="animate-grid-drift animate-grid-breathe absolute inset-0"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    {/* Ambient glows — positioned safely inside the viewport bounds so
        nothing gets flattened at an edge */}
    <div className="absolute left-[6%] top-[8%] size-[620px] rounded-full bg-neon-purple/[0.08] blur-[130px]" />
    <div className="absolute bottom-[6%] right-[6%] size-[560px] rounded-full bg-neon-blue/[0.06] blur-[120px]" />
  </div>
);

export { GlobalBackground };
