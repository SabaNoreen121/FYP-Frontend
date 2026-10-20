import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { tenantApi, type StockAlertSummary } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const SESSION_KEY = "loginStockAlerts";

export function setLoginStockAlerts(summary: StockAlertSummary | null) {
  try {
    if (summary?.count) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(summary));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    /* ignore */
  }
}

function readLoginStockAlerts(): StockAlertSummary | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StockAlertSummary;
  } catch {
    return null;
  }
}

export default function StockAlertsBanner() {
  const { isSuperadmin } = useAuth();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<StockAlertSummary | null>(null);
  const [dismissing, setDismissing] = useState(false);

  const load = useCallback(async () => {
    if (isSuperadmin) return;
    try {
      const data = await tenantApi.getStockAlerts();
      setSummary(data.count > 0 ? data : null);
    } catch {
      const cached = readLoginStockAlerts();
      setSummary(cached?.count ? cached : null);
    }
  }, [isSuperadmin]);

  useEffect(() => {
    if (isSuperadmin) return;
    const cached = readLoginStockAlerts();
    if (cached?.count) setSummary(cached);
    load();
  }, [isSuperadmin, load]);

  const dismiss = async () => {
    setDismissing(true);
    try {
      const ids = (summary?.alerts || []).map((a) => a.id).filter(Boolean) as string[];
      await tenantApi.dismissStockAlerts(ids.length ? ids : undefined);
      sessionStorage.removeItem(SESSION_KEY);
      setSummary(null);
    } catch {
      /* keep banner */
    } finally {
      setDismissing(false);
    }
  };

  const goToInventory = () => {
    navigate("/inventory?stock=out");
  };

  if (!summary?.count) return null;

  const items = summary.alerts.slice(0, 5);
  const more = summary.count - items.length;

  return (
    <div
      className="relative z-10 mb-4 rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-900/25 dark:text-amber-100"
      role="alert"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-semibold">
            {summary.count} product{summary.count === 1 ? "" : "s"} out of stock
          </p>
          <ul className="mt-1 list-inside list-disc text-amber-900/90 dark:text-amber-200/90">
            {items.map((a) => (
              <li key={a.product_id}>
                {a.title}
                {a.sku ? ` (${a.sku})` : ""}
              </li>
            ))}
            {more > 0 && <li>…and {more} more</li>}
          </ul>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={goToInventory}
            className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-700"
          >
            View inventory
          </button>
          <button
            type="button"
            onClick={dismiss}
            disabled={dismissing}
            className="rounded-lg border border-amber-300 px-3 py-1.5 text-xs font-medium hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-900/40"
          >
            {dismissing ? "…" : "Dismiss"}
          </button>
        </div>
      </div>
    </div>
  );
}
