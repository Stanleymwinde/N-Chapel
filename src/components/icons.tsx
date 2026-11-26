import {
  Accessibility,
  BookOpen,
  Baby,
  Calendar,
  Car,
  Clock,
  Hand,
  Heart,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Repeat,
  ShieldCheck,
  User,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@content/types";

/** Content files name icons as strings; this maps them to Lucide icons. */
export const iconMap: Record<IconName, LucideIcon> = {
  clock: Clock,
  calendar: Calendar,
  mapPin: MapPin,
  users: Users,
  phone: Phone,
  mail: Mail,
  whatsapp: MessageCircle,
  baby: Baby,
  heart: Heart,
  info: Info,
  shield: ShieldCheck,
  repeat: Repeat,
  video: Video,
  book: BookOpen,
  car: Car,
  accessibility: Accessibility,
  user: User,
  hand: Hand,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const C = iconMap[name];
  return <C size={size} aria-hidden="true" focusable="false" />;
}

/** Brand glyphs (Lucide no longer ships brand logos). Always used with a visible label. */
const brandPaths: Record<string, string> = {
  facebook:
    "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.33-.04-1.56-.14-2.86-.14C11.93 2 10 3.66 10 6.7v2.8H7v4h3V22h4v-8.5z",
  x: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3zm-1.08 16.2h1.7L7.4 4.73H5.57L16.67 19.2z",
  instagram:
    "M12 2.2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85C2.42 3.92 3.94 2.37 7.15 2.27 8.42 2.21 8.8 2.2 12 2.2zm0 4.86a4.94 4.94 0 1 0 0 9.88 4.94 4.94 0 0 0 0-9.88zm0 8.15a3.21 3.21 0 1 1 0-6.42 3.21 3.21 0 0 1 0 6.42zm5.13-9.5a1.15 1.15 0 1 0 0 2.3 1.15 1.15 0 0 0 0-2.3z",
  youtube:
    "M21.58 7.19a2.5 2.5 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.5 2.5 0 0 0-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81a2.5 2.5 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.5 2.5 0 0 0 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
  tiktok:
    "M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1 3.4-2.47V9.67a5.69 5.69 0 0 0-6.49 5.63A5.69 5.69 0 0 0 9.86 21a5.69 5.69 0 0 0 5.68-5.69V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z",
};

export function BrandIcon({ name, size = 20 }: { name: string; size?: number }) {
  const d = brandPaths[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}
