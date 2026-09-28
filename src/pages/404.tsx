import { ButtonLink } from '../components/ButtonLink';
import { SiteShell } from '../layout/SiteShell';

const NotFound = () => (
  <SiteShell
    locale="en"
    title="Page not found | thesis-i"
    description="The page you are looking for does not exist."
    path=""
    noindex
  >
    <section>
      <div className="container-page flex min-h-[100dvh] flex-col justify-center py-32">
        <p className="text-sm text-subtle">404</p>
        <h1 className="mt-4 max-w-[16ch] text-5xl font-medium leading-[1.02] tracking-display text-ink md:text-6xl">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 max-w-[48ch] text-lg text-muted">
          The link may be outdated or mistyped.
        </p>
        <p lang="uk" className="mt-1 max-w-[48ch] text-lg text-muted">
          Сторінку не знайдено. Можливо, посилання застаріло.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to homepage</ButtonLink>
          <ButtonLink href="/ua/" variant="secondary">
            Українською
          </ButtonLink>
        </div>
      </div>
    </section>
  </SiteShell>
);

export default NotFound;
