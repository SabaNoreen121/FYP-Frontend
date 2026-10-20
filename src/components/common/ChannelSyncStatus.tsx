import type { CompanyIntegration, Order, Product } from "../../api/client";

export type ChannelSlug = "shopify" | "daraz";

/** Which marketplaces this product should sync to (based on company integrations + product settings). */
export function getProductPushTargets(
  product: Product,
  companyIntegrations: CompanyIntegration[]
): ChannelSlug[] {
  const companyId = product.company_id;
  if (!companyId) return [];

  const activeSlugs = companyIntegrations
    .filter(
      (ci) =>
        (ci.company_id || "") === companyId &&
        ci.status === 1 &&
        (ci.integration_slug === "shopify" || ci.integration_slug === "daraz")
    )
    .map((ci) => ci.integration_slug as ChannelSlug);

  const fromProduct = (product.integration_slugs ?? []).filter(
    (s): s is ChannelSlug => s === "shopify" || s === "daraz"
  );
  if (fromProduct.length > 0) {
    return fromProduct.filter((s) => activeSlugs.includes(s));
  }

  const src = (product.source || "").toLowerCase();
  if (src === "shopify" || src === "daraz") {
    return activeSlugs.includes(src) ? [src] : [];
  }

  return activeSlugs;
}

export function formatChannelLabel(source?: string | null): string | null {
  const s = (source || "").toLowerCase();
  if (s === "shopify") return "Shopify";
  if (s === "daraz") return "Daraz";
  return null;
}

export function getProductChannel(p: Product): ChannelSlug | null {
  const src = (p.source || "").toLowerCase();
  if (src === "shopify" || src === "daraz") return src;
  if (p.daraz_synced || (p.integration_slugs ?? []).includes("daraz")) return "daraz";
  if (p.shopify_synced || (p.integration_slugs ?? []).includes("shopify")) return "shopify";
  return null;
}

export function isProductSynced(p: Product): boolean {
  const ch = getProductChannel(p);
  if (ch === "shopify") return !!p.shopify_synced;
  if (ch === "daraz") return !!p.daraz_synced;
  return !!(p.shopify_synced || p.daraz_synced);
}

export function getOrderChannel(o: Order): ChannelSlug | null {
  const s = (o.source || "").toLowerCase();
  if (s === "shopify" || s === "daraz") return s;
  return null;
}

export function isOrderSynced(o: Order): boolean {
  const ch = getOrderChannel(o);
  return !!ch && !!o.external_id;
}

export function productStatusLabel(status?: string): string {
  const s = status || "active";
  if (s === "published") return "Active";
  if (s === "scheduled") return "Draft";
  if (s === "hidden") return "Archived";
  return String(s).charAt(0).toUpperCase() + String(s).slice(1).toLowerCase();
}

export function SyncStatusBadge({ synced }: { synced: boolean }) {
  return synced ? (
    <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
      Synced
    </span>
  ) : (
    <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-400">
      Not synced
    </span>
  );
}

export function ChannelCell({ channel }: { channel?: string | null }) {
  const label = formatChannelLabel(channel);
  return (
    <span className="text-sm text-gray-700 dark:text-gray-300">{label ?? "—"}</span>
  );
}

export function ProductChannelCell({ product }: { product: Product }) {
  return <ChannelCell channel={getProductChannel(product) ?? product.source} />;
}

export function ProductSyncStatus({ product }: { product: Product }) {
  const ch = getProductChannel(product);
  if (!ch && !product.company_id) {
    return <span className="text-xs text-gray-400">—</span>;
  }
  return <SyncStatusBadge synced={isProductSynced(product)} />;
}

export function OrderChannelCell({ order }: { order: Order }) {
  return <ChannelCell channel={order.source} />;
}

export function OrderSyncStatus({ order }: { order: Order }) {
  const ch = getOrderChannel(order);
  if (!ch && !order.company_id) {
    return <span className="text-xs text-gray-400">—</span>;
  }
  return <SyncStatusBadge synced={isOrderSynced(order)} />;
}
