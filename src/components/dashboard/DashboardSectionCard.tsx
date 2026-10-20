import type { ReactNode } from "react";
import { Link } from "react-router";

type HeaderAccent = "indigo" | "emerald" | "violet" | "amber";

const headerAccents: Record<HeaderAccent, string> = {
  indigo: "from-indigo-500 to-violet-600",
  emerald: "from-emerald-500 to-teal-600",
  violet: "from-violet-500 to-purple-600",
  amber: "from-amber-500 to-orange-500",
};

export default function DashboardSectionCard({
  title,
  subtitle,
  children,
  linkTo,
  linkLabel,
  accent = "indigo",
  icon,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  linkTo?: string;
  linkLabel?: string;
  accent?: HeaderAccent;
  icon?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm dark:border-gray-700/80 dark:bg-gray-900/50">
      <div className={`bg-gradient-to-r px-5 py-4 sm:px-6 ${headerAccents[accent]}`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white backdrop-blur-sm">
                {icon}
              </span>
            )}
            <div>
              <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
              {subtitle && <p className="text-xs text-white/80 sm:text-sm">{subtitle}</p>}
            </div>
          </div>
          {linkTo && linkLabel && (
            <Link
              to={linkTo}
              className="shrink-0 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/30"
            >
              {linkLabel}
            </Link>
          )}
        </div>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}


