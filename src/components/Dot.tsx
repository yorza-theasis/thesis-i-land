/* The blue dot of the "i" in the logo, used as a full stop on key headlines. */
const Dot = ({ className = '' }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`ml-[0.06em] inline-block size-[0.2em] rounded-full bg-signal align-baseline ${className}`}
  />
);

export { Dot };
