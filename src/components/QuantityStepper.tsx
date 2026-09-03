import { Minus, Plus } from "lucide-react";

export function QuantityStepper({
  qty,
  label,
  onDecrement,
  onIncrement,
}: {
  qty: number;
  label: string;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-foreground/15 bg-background">
      <button
        type="button"
        onClick={onDecrement}
        aria-label={`Diminuer la quantité de ${label}`}
        className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span aria-live="polite" className="min-w-8 text-center text-sm font-bold tabular-nums">
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        aria-label={`Augmenter la quantité de ${label}`}
        className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
