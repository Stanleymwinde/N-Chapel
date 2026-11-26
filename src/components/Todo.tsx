import { ChSpan } from "@/components/primitives";

const isDev = process.env.NODE_ENV !== "production";

/**
 * A missing fact, shown quietly: italic, slightly faded, with a fine dotted
 * underline in the surrounding text colour, so it sits naturally on light or
 * dark sections. Development shows the editor's note; production shows
 * "to be confirmed". Hover (title) always reveals the full note.
 * Every TODO is listed in CONTENT-TODO.md.
 */
export function Todo({ note }: { note: string }) {
  return (
    <ChSpan
      data-todo=""
      title={`To be confirmed: ${note}`}
      fontStyle="italic"
      textDecoration="underline"
      textDecorationStyle="dotted"
      textDecorationThickness="1px"
      textUnderlineOffset="0.25em"
      cursor="help"
    >
      {isDev ? note : "to be confirmed"}
    </ChSpan>
  );
}
