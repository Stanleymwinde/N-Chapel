import type { Fact } from "@content/types";
import { isTodo } from "@content/site";
import { Icon } from "./icons";
import { RichText } from "./RichText";
import { FactListIcon, FactListItem, FactListLabel, FactListRoot, FactListValue } from "./recipe-parts";

type Props = {
  facts: readonly Fact[];
  layout?: "stack" | "grid" | "inline";
  tone?: "light" | "dark";
};

/** "When / Where / Who / Contact" rows. Used on every ministry page. */
export function FactList({ facts, layout = "stack", tone = "light" }: Props) {
  return (
    <FactListRoot layout={layout} tone={tone}>
      {facts.map((f) => (
        <FactListItem key={`${f.label}-${f.value}`}>
          <FactListIcon>
            <Icon name={f.icon} />
          </FactListIcon>
          <FactListLabel>{f.label}</FactListLabel>
          <FactListValue>
            {f.href && !isTodo(f.href) ? (
              <a
                href={f.href}
                {...(/^https?:/.test(f.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <RichText text={f.value} />
              </a>
            ) : (
              <RichText text={f.value} />
            )}
          </FactListValue>
        </FactListItem>
      ))}
    </FactListRoot>
  );
}
