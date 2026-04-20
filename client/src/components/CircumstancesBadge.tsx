import { cn } from "@/lib/utils";

export type Circumstances =
  | "ready_now"
  | "currently_studying"
  | "going_through_divorce"
  | "already_married_seeking_second"
  | "working_abroad"
  | "financial_constraints";

const CIRCUMSTANCES_CONFIG: Record<
  Circumstances,
  { label: string; emoji: string; color: string }
> = {
  ready_now: {
    label: "Ready Now",
    emoji: "✅",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  currently_studying: {
    label: "Currently Studying",
    emoji: "📚",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  going_through_divorce: {
    label: "Going Through Divorce",
    emoji: "⚖️",
    color: "bg-amber-100 text-amber-800 border-amber-200",
  },
  already_married_seeking_second: {
    label: "Seeking Second Wife",
    emoji: "🌙",
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  working_abroad: {
    label: "Working Abroad",
    emoji: "✈️",
    color: "bg-sky-100 text-sky-800 border-sky-200",
  },
  financial_constraints: {
    label: "Financial Constraints",
    emoji: "💼",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
};

interface CircumstancesBadgeProps {
  circumstances: Circumstances | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function CircumstancesBadge({
  circumstances,
  size = "md",
  className,
}: CircumstancesBadgeProps) {
  const config = CIRCUMSTANCES_CONFIG[circumstances as Circumstances];
  if (!config) return null;

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        config.color,
        sizeClasses[size],
        className
      )}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
}

export function getCircumstancesLabel(circumstances: string): string {
  return CIRCUMSTANCES_CONFIG[circumstances as Circumstances]?.label ?? circumstances;
}

export { CIRCUMSTANCES_CONFIG };
