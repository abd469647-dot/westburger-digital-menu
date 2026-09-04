import { Plus } from "lucide-react";
import { toast } from "sonner";

import type { MenuCategory, MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { formatDA, getPurchaseOptions, type PurchaseOption } from "@/lib/menu-options";

export function AddToCartButtons({ category, item }: { category: MenuCategory; item: MenuItem }) {
  const { addItem, openCart } = useCart();
  const options = getPurchaseOptions(category, item);

  if (!options.length) return null;

  const add = (option: PurchaseOption) => {
    addItem(option);
    toast.success("Ajouté au panier", {
      description: `${option.name}${option.optionLabel ? ` · ${option.optionLabel}` : ""} — ${formatDA(option.price)}`,
      action: { label: "Voir le panier", onClick: openCart },
    });
  };

  const single = options[0];

  if (options.length === 1 && single) {
    return (
      <button
        type="button"
        onClick={() => add(single)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark focus-visible:ring-offset-2"
      >
        <Plus className="size-4" aria-hidden="true" />
        Ajouter au panier
      </button>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => add(option)}
          aria-label={`Ajouter au panier : ${option.name} ${option.optionLabel ?? ""}`}
          className="inline-flex flex-1 min-w-[45%] items-center justify-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-yellow hover:border-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark focus-visible:ring-offset-2"
        >
          <Plus className="size-3.5" aria-hidden="true" />
          {option.optionLabel}
        </button>
      ))}
    </div>
  );
}
