import type { CaseStatus } from '../data/cases';
import { useT } from '../i18n/LocaleContext';

const dotClass: Record<CaseStatus, string> = {
  completed: 'bg-ink/70',
  in_progress: 'bg-signal',
  prototype: 'border border-ink/60',
};

const StatusBadge = ({ status }: { status: CaseStatus }) => {
  const { common } = useT();
  return (
    <span className="label inline-flex items-center gap-2 !text-muted">
      <span className="relative flex size-1.5">
        {status === 'in_progress' && (
          <span className="animate-ping-soft absolute inset-0 rounded-full bg-signal" />
        )}
        <span
          className={`relative size-1.5 rounded-full ${dotClass[status]}`}
        />
      </span>
      {common.status[status]}
    </span>
  );
};

export { StatusBadge };
