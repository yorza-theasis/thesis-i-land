import { Fragment } from 'react';

/** Splits "plain *accent* plain" into segments; odd segments are accented. */
export const parseAccent = (text: string) =>
  text.split('*').map((part, i) => ({ text: part, accent: i % 2 === 1 }));

/* Renders a translated title, colouring the phrase wrapped in *asterisks*. */
const Accented = ({ text }: { text: string }) => (
  <>
    {parseAccent(text).map((seg, i) =>
      seg.accent ? (
        <span key={i} className="text-signal-ink">
          {seg.text}
        </span>
      ) : (
        <Fragment key={i}>{seg.text}</Fragment>
      ),
    )}
  </>
);

export { Accented };
