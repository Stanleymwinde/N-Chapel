import { Fragment } from "react";
import { Todo } from "./Todo";

const TODO_RE = /(\[TODO:[^\]]*\])/g;

/**
 * Renders a content string, turning "[TODO: …]" markers into <Todo>.
 * Use for every string that comes from /content.
 */
export function RichText({ text }: { text: string | undefined | null }) {
  if (!text) return null;
  const parts = text.split(TODO_RE);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[TODO:") ? (
          <Todo key={i} note={part.slice(6, -1).trim()} />
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain-text version for <title>, meta descriptions and JSON-LD. */
export function plainText(text: string): string {
  return text.replace(TODO_RE, "").replace(/\s{2,}/g, " ").trim();
}
