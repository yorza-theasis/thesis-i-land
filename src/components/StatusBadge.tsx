import type { CaseStatus } from '../data/cases';
import { useT } from '../i18n/LocaleContext';

/* Plain-text project status; no decorative dot. */
const StatusBadge = ({ status }: { status: CaseStatus }) => {
  const { common } = useT();
  return <span className="text-sm text-subtle">{common.status[status]}</span>;
};

export { StatusBadge };
