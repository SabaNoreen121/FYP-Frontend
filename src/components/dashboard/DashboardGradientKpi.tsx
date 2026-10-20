import type { ReactNode } from "react";
import DashboardSparkline from "./DashboardSparkline";

type Variant = "purple" | "green" | "blue" | "coral" | "amber";

const variants: Record<
  Variant,
  { bg: string; decor: string; spark: string }
> = {
  purple: {
    bg: "bg-gradient-to-br from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa]",
    decor: "bg-white/15",
    spark: "#ffffff",
  },
  green: {
    bg: "bg-gradient-to-br from-[#059669] via-[#10b981] to-[#34d399]",
    decor: "bg-white/15",
    spark: "#ffffff",
  },
  blue: {
    bg: "bg-gradient-to-br from-[#2563eb] via-[#3b82f6] to-[#60a5fa]",
    decor: "bg-white/15",
    spark: "#ffffff",
  },
  coral: {
    bg: "bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#fb923c]",
    decor: "bg-white/15",
    spark: "#ffffff",
  },
};

export default function DashboardGradientKpi({
  label,
  value,
  change,
  icon,
  variant = "purple",
  sparklineData = [],
}: {
  label: string;
  value: string | number;
  change?: string;
  icon: ReactNode;
  variant?: Variant;
  sparklineData?: number[];
}) {
  const v = variants[variant] ?? variants.purple;
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-5 text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl ${v.bg}`}
    >
      <div className={`pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full ${v.decor}`} />
      <div className={`pointer-events-none absolute -bottom-6 right-8 h-16 w-16 rounded-full ${v.decor}`} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/85">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          {change && <p className="mt-1 text-xs text-white/75">{change}</p>}
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
          {icon}
        </span>
      </div>
      <div className="relative mt-3 -mb-1">
        <DashboardSparkline data={sparklineData} color={v.spark} />
      </div>
    </div>
  );
}
