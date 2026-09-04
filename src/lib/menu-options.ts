import { menuCategories, type MenuCategory, type MenuItem } from "@/data/menu";

export type PurchaseOption = {
  /** Stable unique id: category / item / option */
  id: string;
  /** Item name as printed on the menu */
  name: string;
  /** Optional option label (variant name, or the printed price when several prices exist) */
  optionLabel?: string;
  /** Numeric unit price in DA */
  price: number;
  img: string;
  category: string;
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const formatDA = (amount: number) => `${amount.toLocaleString("fr-FR")} DA`;

/** Extracts every numeric price printed in a price string ("450 DA / 650 DA" -> [450, 650]) */
const parsePrices = (price?: string): number[] => {
  if (!price) return [];
  return (price.match(/\d[\d\s.]*/g) ?? [])
    .map((raw) => Number(raw.replace(/[\s.]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
};

/**
 * Purchasable options for a menu item. Nothing is invented: variants keep their
 * printed labels, and items printed with several prices expose one option per
 * printed price (labelled with that price).
 */
export function getPurchaseOptions(category: MenuCategory, item: MenuItem): PurchaseOption[] {
  const base = `${category.id}-${slug(item.name)}`;

  if (item.variants?.length) {
    return item.variants.map((variant) => ({
      id: `${base}-${slug(variant.label)}`,
      name: item.name,
      optionLabel: variant.label,
      price: parsePrices(variant.price)[0] ?? 0,
      img: item.img,
      category: category.name,
    }));
  }

  const prices = parsePrices(item.price);
  if (prices.length <= 1) {
    return prices.length === 1
      ? [
          {
            id: base,
            name: item.name,
            price: prices[0]!,
            img: item.img,
            category: category.name,
          },
        ]
      : [];
  }

  return prices.map((price) => ({
    id: `${base}-${price}`,
    name: item.name,
    optionLabel: formatDA(price),
    price,
    img: item.img,
    category: category.name,
  }));
}

/** id -> option, for rehydrating a stored cart */
export const purchaseOptionIndex: Record<string, PurchaseOption> = (() => {
  const index: Record<string, PurchaseOption> = {};
  for (const category of menuCategories) {
    for (const item of category.items) {
      for (const option of getPurchaseOptions(category, item)) {
        index[option.id] = option;
      }
    }
  }
  return index;
})();
