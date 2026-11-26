import NextLink from "next/link";
import { Button as ChakraButton, type ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { isTodo } from "@content/site";

type Variant = "primary" | "secondary" | "link" | "accent" | "inverse" | "inverseOutline";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  /** opens in a new tab with an accessible hint */
  external?: boolean;
  /** show the trailing arrow (default for link variant) */
  arrow?: boolean;
  /** download attribute for files */
  download?: boolean;
  icon?: React.ReactNode;
} & Omit<ChakraButtonProps, "variant" | "size" | "asChild">;

/**
 * Link styled with the one button recipe. Labels must be verbs.
 * If href is still a TODO placeholder, renders the label plus a TODO marker
 * instead of a broken link.
 */
export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  arrow,
  download,
  icon,
  ...rest
}: LinkButtonProps) {
  const showArrow = arrow ?? variant === "link";
  if (isTodo(href)) {
    return (
      <ChakraButton
        as="span"
        variant={variant}
        size={size}
        aria-disabled="true"
        title={`Link to be confirmed: ${href.replace(/^\[TODO:\s*|\]$/g, "")}`}
        opacity={0.6}
        cursor="not-allowed"
        {...rest}
      >
        {icon}
        {children}
        <span className="sr-only"> (link coming soon)</span>
      </ChakraButton>
    );
  }
  const isExternal = external ?? /^https?:\/\//.test(href);
  const content = (
    <>
      {icon}
      {children}
      {isExternal ? (
        <>
          <ExternalLink aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      ) : showArrow ? (
        <ArrowRight aria-hidden="true" />
      ) : null}
    </>
  );
  return (
    <ChakraButton asChild variant={variant} size={size} {...rest}>
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : download || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") ? (
        <a href={href} download={download || undefined}>
          {content}
        </a>
      ) : (
        <NextLink href={href}>{content}</NextLink>
      )}
    </ChakraButton>
  );
}

export { ChakraButton as Button };
