import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";

import { QuantityStepper } from "@/components/QuantityStepper";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart";
import { formatDA } from "@/lib/menu-options";
import { lineLabel } from "@/lib/order-message";

export function CartDrawer() {
  const { lines, count, subtotal, isOpen, closeCart, increment, decrement, removeItem } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md"
      >
        <header className="flex items-center gap-3 border-b border-foreground/10 px-5 py-5 pr-14">
          <SheetTitle className="font-display text-2xl font-semibold tracking-tight text-foreground">
            Votre commande
          </SheetTitle>
          <span className="rounded-full bg-yellow px-2.5 py-1 text-xs font-bold text-brand">
            {count}
          </span>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid size-14 place-items-center rounded-full bg-yellow/30">
              <ShoppingBag className="size-6 text-brand" aria-hidden="true" />
            </div>
            <p className="font-display text-xl font-semibold text-foreground">Votre panier est vide</p>
            <Link
              to="/menu"
              onClick={closeCart}
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand/90"
            >
              Explorer le menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3 border-b border-foreground/10 pb-4 last:border-0">
                  {line.img ? (
                    <img
                      src={line.img}
                      alt={lineLabel(line)}
                      width={120}
                      height={150}
                      loading="lazy"
                      className="size-20 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-yellow/30 text-center font-display text-xs font-semibold leading-tight text-brand">
                      Supplément
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold leading-tight text-foreground">
                          {line.name}
                        </h3>
                        {line.optionLabel && (
                          <p className="text-xs text-foreground/60">{line.optionLabel}</p>
                        )}
                        <p className="mt-1 text-sm font-semibold text-yellow-dark">
                          {formatDA(line.price)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        aria-label={`Retirer ${lineLabel(line)} du panier`}
                        className="grid size-8 shrink-0 place-items-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <QuantityStepper
                        qty={line.qty}
                        label={lineLabel(line)}
                        onDecrement={() => decrement(line.id)}
                        onIncrement={() => increment(line.id)}
                      />
                      <span className="text-sm font-bold text-foreground tabular-nums">
                        {formatDA(line.qty * line.price)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-foreground/10 px-5 py-5 space-y-3">
              <div className="flex items-baseline justify-between text-sm text-foreground/70">
                <span>Sous-total</span>
                <span className="font-semibold tabular-nums">{formatDA(subtotal)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-foreground/10 pt-3">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-foreground/70">
                  Total
                </span>
                <span className="font-display text-2xl font-bold tabular-nums text-foreground">
                  {formatDA(subtotal)}
                </span>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-brand/90"
              >
                Continuer la commande
              </Link>
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function FloatingCartButton() {
  const { count, openCart, subtotal } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Ouvrir le panier, ${count} article${count === 1 ? "" : "s"}`}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-cream wb-shadow transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark focus-visible:ring-offset-2"
    >
      <span className="relative grid place-items-center">
        <ShoppingBag className="size-5" aria-hidden="true" />
        {count > 0 && (
          <span className="absolute -right-2.5 -top-2.5 grid size-5 place-items-center rounded-full bg-yellow text-[10px] font-bold text-brand">
            {count}
          </span>
        )}
      </span>
      <span className="tabular-nums">{count > 0 ? formatDA(subtotal) : "Panier"}</span>
    </button>
  );
}
