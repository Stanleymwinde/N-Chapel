import type { Fact, FormDefinition, InfoBlock, Link, MediaKey, Scripture } from "../types";

/** Shared shape for every ministry page's header, facts and closing band. */
export type MinistryBase = {
  slug: string;
  href: string;
  /** H1 */
  title: string;
  /** short name for cards and breadcrumbs */
  name: string;
  meta: { title: string; description: string };
  intro: string;
  heroImage: MediaKey;
  /** When / Where / Who / Contact */
  facts: Fact[];
  scripture?: Scripture;
  nextStep: { title: string; text?: string; primary: Link; secondary?: Link };
};

/** Expanded acronym, e.g. F.A.I.T.H. */
export type AcronymLetter = { letter: string; word: string; text: string };

export type { Fact, FormDefinition, InfoBlock, Link, MediaKey, Scripture };
