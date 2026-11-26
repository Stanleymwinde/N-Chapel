import type { PathwayStep as Step } from "@content/types";

import { LinkButton } from "./Button";
import { RichText } from "./RichText";
import { ChDiv, ChUl } from "@/components/primitives";
import {
  PathwayBody,
  PathwayContent,
  PathwayMeta,
  PathwayNumber,
  PathwayRoot,
  PathwayStep,
  PathwayTitle,
} from "./recipe-parts";

/** Numbered pathway: horizontal on desktop, vertical on mobile. */
export function Pathway({ steps, headingLevel = "h3" }: { steps: readonly Step[]; headingLevel?: "h2" | "h3" }) {
  const columns = String(Math.min(Math.max(steps.length, 3), 5)) as "3" | "4" | "5";
  return (
    <PathwayRoot columns={columns}>
      {steps.map((s, i) => (
        <PathwayStep key={s.title}>
          <PathwayNumber aria-hidden="true">
            <span>{i + 1}</span>
          </PathwayNumber>
          <PathwayContent>
            <PathwayTitle as={headingLevel}>
              <span className="sr-only">Step {i + 1}: </span>
              {s.title}
            </PathwayTitle>
            {s.when && (
              <PathwayMeta>
                <RichText text={s.when} />
              </PathwayMeta>
            )}
            <PathwayBody>
              <RichText text={s.summary} />
            </PathwayBody>
            {s.bullets && (
              <ChUl pl="5" color="fg.muted" display="grid" gap="1">
                {s.bullets.map((b) => (
                  <li key={b}>
                    <RichText text={b} />
                  </li>
                ))}
              </ChUl>
            )}
            {s.cta && (
              <ChDiv pt="1">
                <LinkButton href={s.cta.href} variant="link">
                  {s.cta.label}
                </LinkButton>
              </ChDiv>
            )}
          </PathwayContent>
        </PathwayStep>
      ))}
    </PathwayRoot>
  );
}
