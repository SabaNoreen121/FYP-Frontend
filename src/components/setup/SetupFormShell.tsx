import type { ReactNode } from "react";

type SetupFormShellProps = {
  title: string;
  subtitle?: string;
  badge?: string;
  onCancel: () => void;
  children: ReactNode;
  aside: ReactNode;
  footer?: ReactNode;
  formId?: string;
  onSubmit?: (e: React.FormEvent) => void;
};

export function SetupFormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-100 bg-gray-50/60 p-5 dark:border-gray-800 dark:bg-gray-800/40">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function SetupFormAside({
  title,
  steps,
  tips,
  accent = "violet",
}: {
  title: string;
  steps?: { label: string; detail: string }[];
  tips?: string[];
  accent?: "violet" | "sky" | "emerald" | "amber";
}) {
  const accents = {
    violet: {
      card: "from-violet-600 to-indigo-600",
      step: "bg-violet-500",
      border: "border-violet-100 dark:border-violet-900/40",
    },
    sky: {
      card: "from-sky-600 to-blue-600",
      step: "bg-sky-500",
      border: "border-sky-100 dark:border-sky-900/40",
    },
    emerald: {
      card: "from-emerald-600 to-teal-600",
      step: "bg-emerald-500",
      border: "border-emerald-100 dark:border-emerald-900/40",
    },
    amber: {
      card: "from-amber-500 to-orange-500",
      step: "bg-amber-500",
      border: "border-amber-100 dark:border-amber-900/40",
    },
  };
  const a = accents[accent];

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <div className={`overflow-hidden rounded-xl bg-gradient-to-br p-5 text-white shadow-lg ${a.card}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-white/80">Setup guide</p>
        <h3 className="mt-2 text-lg font-bold leading-snug">{title}</h3>
      </div>

      {steps && steps.length > 0 && (
        <div
          className={`rounded-xl border bg-white p-5 shadow-sm dark:bg-gray-900/80 ${a.border}`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Steps
          </p>
          <ol className="mt-4 space-y-4">
            {steps.map((step, i) => (
              <li key={step.label} className="flex gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${a.step}`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{step.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {tips && tips.length > 0 && (
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Tips
          </p>
          <ul className="mt-3 space-y-2">
            {tips.map((tip) => (
              <li
                key={tip}
                className="flex gap-2 text-sm text-gray-600 dark:text-gray-300 before:shrink-0 before:content-['•']"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export default function SetupFormShell({
  title,
  subtitle,
  badge,
  onCancel,
  children,
  aside,
  footer,
  formId,
  onSubmit,
}: SetupFormShellProps) {
  const FormTag = onSubmit ? "form" : "div";

  return (
    <div
      className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-gray-700 dark:bg-gray-900/50 dark:shadow-none"
    >
      <div className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-6 py-5 dark:border-gray-800 dark:from-gray-900 dark:to-gray-900/80 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {badge && (
              <span className="inline-block rounded-md bg-violet-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                {badge}
              </span>
            )}
            <h2 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="shrink-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            ← Back to list
          </button>
        </div>
      </div>

      <FormTag
        id={formId}
        onSubmit={onSubmit}
        className="block p-6 sm:p-8"
      >
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">{children}</div>
          <div className="lg:col-span-2">{aside}</div>
        </div>

        {footer ?? (
          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-500/25 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              Save
            </button>
          </div>
        )}
      </FormTag>
    </div>
  );
}
