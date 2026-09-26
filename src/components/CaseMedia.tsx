import type { CaseMeta } from '../data/cases';

type CaseMediaProps = {
  meta: CaseMeta;
  alt: string;
  figureCaption?: string;
};

const imgClass =
  'size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]';

/* Renders a case's visual at whatever size its parent frame dictates. */
const CaseMedia = ({ meta, alt, figureCaption }: CaseMediaProps) => {
  const { media } = meta;

  if (media.kind === 'diptych') {
    return (
      <div className="grid size-full grid-cols-2 gap-1.5">
        {media.src.map((src, i) => (
          <div key={src} className="overflow-hidden">
            <img
              src={src}
              alt={i === 0 ? alt : ''}
              loading="lazy"
              decoding="async"
              className={imgClass}
            />
          </div>
        ))}
      </div>
    );
  }

  if (media.kind === 'figure') {
    return (
      <div
        role="img"
        aria-label={`${media.value} — ${figureCaption ?? alt}`}
        className="relative flex size-full flex-col justify-between p-6 md:p-8"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(var(--line) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line) / 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="flex items-center justify-between">
          <span className="label">fig. {meta.num}</span>
          <span className="size-2 rounded-full bg-signal" />
        </div>
        <div>
          <div className="font-mono text-[4.5rem] font-medium leading-none tracking-tight text-ink transition-transform duration-700 ease-out group-hover:-translate-y-1 md:text-[6.5rem]">
            {media.value}
          </div>
          {figureCaption && (
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-muted">
              {figureCaption}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (media.contain) {
    return (
      <div
        className="flex size-full items-center justify-center p-6"
        style={{ backgroundColor: media.contain.background }}
      >
        <img
          src={media.src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="max-h-full w-auto object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <img
      src={media.src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={imgClass}
      style={media.position ? { objectPosition: media.position } : undefined}
    />
  );
};

export { CaseMedia };
