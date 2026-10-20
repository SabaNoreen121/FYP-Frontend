import type { ReactNode } from "react";

type Accent = "indigo" | "violet" | "emerald" | "amber" | "rose" | "sky";

const accents: Record<
  Accent,
  { card: string; icon: string; glow: string; value: string }
> = {
  indigo: {
    card: "from-indigo-500/10 via-white to-white dark:from-indigo-500/15 dark:via-gray-900/80 dark:to-gray-900/40",
    icon: "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30",
    glow: "bg-indigo-400/20",
    value: "text-indigo-600 dark:text-indigo-400",
  },
  violet: {
    card: "from-violet-500/10 via-white to-white dark:from-violet-500/15 dark:via-gray-900/80 dark:to-gray-900/40",
    icon: "bg-violet-500 text-white shadow-lg shadow-violet-500/30",
    glow: "bg-violet-400/20",
    value: "text-violet-600 dark:text-violet-400",
  },
  emerald: {
    card: "from-emerald-500/10 via-white to-white dark:from-emerald-500/15 dark:via-gray-900/80 dark:to-gray-900/40",
    icon: "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",
    glow: "bg-emerald-400/20",
    value: "text-emerald-600 dark:text-emerald-400",
  },
  amber: {
    card: "from-amber-500/10 via-white to-white dark:from-amber-500/15 dark:via-gray-900/80 dark:to-gray-900/40",
    icon: "bg-amber-500 text-white shadow-lg shadow-amber-500/30",
    glow: "bg-amber-400/20",
    value: "text-amber-600 dark:text-amber-400",
  },
  rose: {
    card: "from-rose-500/10 via-white to-white dark:from-rose-500/15 dark:via-gray-900/80 dark:to-gray-900/40",
    icon: "bg-rose-500 text-white shadow-lg shadow-rose-500/30",
    glow: "bg-rose-400/20",
    value: "text-rose-600 dark:text-rose-400",
  },
  sky: {
    card: "from-sky-500/10 via-white to-white dark:from-sky-500/15 dark:via-gray-900/80 dark:to-gray-900/40",
    icon: "bg-sky-500 text-white shadow-lg shadow-sky-500/30",
    glow: "bg-sky-400/20",
    value: "text-sky-600 dark:text-sky-400",
  },
};

export default function DashboardStatCard({
  label,
  value,
  hint,
  icon,
  accent = "indigo",
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon: ReactNode;
  accent?: Accent;
}) {
  const a = accents[accent];
  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-br p-5 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700/80 ${a.card}`}>
      <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl ${a.glow}`} />
      <div className="relative flex items-start justify-between gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${a.icon}`}>
          {icon}
        </div>
      </div>
      <p className="relative mt-4 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className={`relative mt-1 text-2xl font-bold tracking-tight ${a.value}`}>{value}</p>
      {hint && <p className="relative mt-1 text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
}
