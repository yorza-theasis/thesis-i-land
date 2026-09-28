/* Single source of truth for case metadata. Copy (titles, descriptions,
 * results) lives per locale in src/i18n/translations.ts under `cases[id]`.
 * `num` drives the public `/cases#case-NN` anchors, so never renumber an
 * existing case — append new ones instead. */

export type CaseId =
  | 'extensa'
  | 'gmi'
  | 'aidept'
  | 'niania'
  | 'ibd'
  | 'cardio'
  | 'qpick'
  | 'compliance'
  | 'butics'
  | 'nexus'
  | 'wirebender'
  | 'vtol'
  | 'crsf';

export type CaseType = 'software' | 'hardware';
export type CaseStatus = 'completed' | 'in_progress' | 'prototype';

export type CaseMedia =
  | {
      kind: 'image';
      src: string;
      position?: string;
      /** Small renders are shown whole on a matching backdrop instead of upscaled. */
      contain?: { background: string };
    }
  | { kind: 'diptych'; src: [string, string]; position?: string }
  // Projects without publishable screenshots get a typographic figure
  // instead of a fake dashboard illustration.
  | { kind: 'figure'; value: string };

export type CaseMeta = {
  id: CaseId;
  num: string;
  type: CaseType;
  status: CaseStatus;
  media: CaseMedia;
  stack: string[];
  href?: string;
};

export const CASES: CaseMeta[] = [
  {
    id: 'extensa',
    num: '01',
    type: 'software',
    status: 'completed',
    media: { kind: 'image', src: '/assets/images/extensa.jpg' },
    stack: ['Claude GoalAgent', 'FastAPI', 'Background tasks'],
  },
  {
    id: 'gmi',
    num: '02',
    type: 'software',
    status: 'in_progress',
    media: {
      kind: 'diptych',
      src: ['/assets/images/gmi-doc-1.jpg', '/assets/images/gmi-doc-2.jpg'],
      position: '50% 0%',
    },
    stack: ['Rules engine', 'LLM analysis', 'RAG'],
  },
  {
    id: 'aidept',
    num: '03',
    type: 'software',
    status: 'completed',
    media: { kind: 'image', src: '/assets/images/684_1x_shots_so.jpg' },
    stack: ['Next.js', 'Spring Boot', 'RAG', 'Kubernetes'],
    href: 'https://aidept.com.ua/en',
  },
  {
    id: 'niania',
    num: '04',
    type: 'software',
    status: 'completed',
    media: { kind: 'image', src: '/assets/images/21_1x_shots_so.jpg' },
    stack: ['iOS', 'Android', 'Real-time booking', 'Payments'],
    href: 'https://www.niania24.com/ua',
  },
  {
    id: 'ibd',
    num: '05',
    type: 'software',
    status: 'completed',
    media: { kind: 'image', src: '/assets/images/shot_zzk.jpg' },
    stack: ['Next.js BFF', 'FastAPI', 'Magic-link auth', 'RBAC'],
  },
  {
    id: 'cardio',
    num: '06',
    type: 'software',
    status: 'in_progress',
    media: { kind: 'image', src: '/assets/images/dmd-illustration.jpg' },
    stack: ['NER', 'ICD-10 mapping', 'LLM', 'On-premise'],
  },
  {
    id: 'qpick',
    num: '07',
    type: 'hardware',
    status: 'in_progress',
    media: {
      kind: 'image',
      src: '/assets/images/qpick.jpg',
      position: '50% 40%',
    },
    stack: ['Computer vision', 'Grasp detection', 'Vacuum gripper'],
  },
  {
    id: 'compliance',
    num: '08',
    type: 'software',
    status: 'completed',
    media: {
      kind: 'image',
      src: '/assets/images/ai-agent-compliance.jpg',
      position: '0% 50%',
    },
    stack: ['RAG', 'Role-scoped retrieval', 'PII redaction', 'Audit log'],
  },
  {
    id: 'butics',
    num: '09',
    type: 'software',
    status: 'completed',
    media: { kind: 'image', src: '/assets/images/butics.jpg' },
    stack: ['Mobile POS', 'Barcode scan', 'Visual catalogue'],
  },
  {
    id: 'nexus',
    num: '10',
    type: 'software',
    status: 'completed',
    media: {
      kind: 'image',
      src: '/assets/images/nexus.jpg',
      position: '0% 0%',
    },
    stack: ['Private spaces', 'Selective sharing', 'Multi-device sync'],
  },
  {
    id: 'wirebender',
    num: '11',
    type: 'hardware',
    status: 'completed',
    media: {
      kind: 'diptych',
      src: [
        '/assets/images/wire-bender-1.jpg',
        '/assets/images/wire-bender-2.jpg',
      ],
    },
    stack: ['Stepper drives', 'Control electronics', 'Aluminium housing'],
  },
  {
    id: 'vtol',
    num: '12',
    type: 'hardware',
    status: 'prototype',
    media: {
      kind: 'diptych',
      src: ['/assets/images/vtol-1.jpg', '/assets/images/vtol-2.jpg'],
    },
    stack: ['Tilt-rotor', '3D-printed nodes', 'Custom flight control'],
  },
  {
    id: 'crsf',
    num: '13',
    type: 'hardware',
    status: 'prototype',
    media: {
      kind: 'image',
      src: '/assets/images/crsf-pcb.jpg',
      contain: { background: '#193461' },
    },
    stack: ['PCB design', 'CRSF protocol', 'Fiber-optic link'],
  },
];

/** First image of a case, for small thumbnails. */
export const caseThumb = (
  meta: CaseMeta,
): { src: string; background?: string; position?: string } | null => {
  const { media } = meta;
  if (media.kind === 'image') {
    return {
      src: media.src,
      background: media.contain?.background,
      position: media.position,
    };
  }
  if (media.kind === 'diptych') {
    return { src: media.src[0], position: media.position };
  }
  return null;
};

export const getCase = (id: CaseId): CaseMeta =>
  CASES.find((c) => c.id === id)!;

export const caseHref = (base: string, id: CaseId) =>
  `${base}/cases/#case-${getCase(id).num}`;
