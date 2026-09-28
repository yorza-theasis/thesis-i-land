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
    // Projects without publishable screenshots show their key number instead.
    return (
      <div
        role="img"
        aria-label={`${media.value}: ${figureCaption ?? alt}`}
        className="flex size-full flex-col justify-end p-6 md:p-8"
      >
        <div className="text-[4rem] font-medium leading-none tracking-[-0.04em] text-ink md:text-[5.5rem]">
          {media.value}
        </div>
        {figureCaption && (
          <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-muted">
            {figureCaption}
          </p>
        )}
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
