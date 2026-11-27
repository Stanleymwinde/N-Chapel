import { Clock, MapPin } from "lucide-react";
import type { Group } from "@content/types";
import { LinkButton } from "../Button";
import { RichText } from "../RichText";
import { CardBody, CardDescription, CardEyebrow, CardFooter, CardMeta, CardRoot, CardTitle } from "../recipe-parts";

/**
 * Figma "Group" card (Find a group): 4px purple top edge, 11px audience
 * eyebrow, 18px name, 15px summary, 12px when/where rows and a pill button
 * pinned to the bottom. Built on the shared card recipe (group variant).
 */
export function GroupTile({ group, joinHref, headingLevel = "h3" }: { group: Group; joinHref: string; headingLevel?: "h2" | "h3" }) {
  return (
    <CardRoot variant="group" borderRadius="12px">
      <CardBody px="22px" py="24px" gap="10px">
        <CardEyebrow fontSize="0.6875rem" letterSpacing="0.06em" lineHeight="normal">
          For: {group.audience}
        </CardEyebrow>
        <CardTitle as={headingLevel} fontSize="1.125rem" lineHeight="normal">
          {group.name}
        </CardTitle>
        <CardDescription fontSize="0.9375rem" lineHeight="1.6">
          <RichText text={group.summary} />
        </CardDescription>
        <CardMeta fontSize="0.75rem" lineHeight="1.5" color="fg" pt="2px" gap="6px" css={{ "& svg": { width: "13px", height: "13px", mt: "2px" } }}>
          <li>
            <Clock aria-hidden="true" />
            <span>
              <RichText text={group.when} />
            </span>
          </li>
          <li>
            <MapPin aria-hidden="true" />
            <span>
              <RichText text={group.where} />
            </span>
          </li>
        </CardMeta>
        <CardFooter pt="10px">
          {group.link ? (
            <LinkButton href={group.link.href} variant="secondary">
              {group.link.label}
            </LinkButton>
          ) : (
            <LinkButton href={joinHref} variant="primary" aria-label={`Join this group: ${group.name}`}>
              Join this group
            </LinkButton>
          )}
        </CardFooter>
      </CardBody>
    </CardRoot>
  );
}
