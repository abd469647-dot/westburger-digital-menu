import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { QuantityStepper } from "@/components/QuantityStepper";
import { RESTAURANT_PHONE, RESTAURANT_PHONE_DISPLAY } from "@/config/restaurant";
import { useCart } from "@/lib/cart";
import { formatDA } from "@/lib/menu-options";
import { buildOrderMessage, buildWhatsAppUrl, lineLabel, type OrderDetails } from "@/lib/order-message";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Commander | WestBurger Skikda" },
      {
        name: "description",
        content:
          "Finalisez votre commande WestBurger : à emporter ou en livraison à Skikda, envoyée directement via WhatsApp.",
      },
      { property: "og:title", content: "Commander | WestBurger Skikda" },
      {
        property: "og:description",
        content: "À emporter ou livraison — votre commande WestBurger part directement sur WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type Errors = Partial<Record<"name" | "phone" | "address", string>>;

function CheckoutPage() {
  const { lines, subtotal, increment, decrement, removeItem, count } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<OrderDetails["type"]>("emporter");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Veuillez indiquer votre nom complet.";
    if (!phone.trim()) next.phone = "Veuillez indiquer votre numéro de téléphone.";
    else if (phone.replace(/\D/g, "").length < 9) next.phone = "Numéro de téléphone invalide.";
    if (type === "livraison" && !address.trim()) next.address = "L'adresse est requise pour une livraison.";
    return next;
  };

  const orderDetails = (): OrderDetails => ({ name, phone, type, address, notes });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const message = buildOrderMessage(lines, orderDetails(), subtotal);
    toast.success("Commande préparée", { description: "Ouverture de WhatsApp..." });

    const opened = window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
    if (!opened) {
      toast.error("WhatsApp n'a pas pu s'ouvrir", {
        description: "Utilisez « Copier la commande » pour la partager manuellement.",
      });
    }
  };

  const handleCopy = async () => {
    const message = buildOrderMessage(lines, orderDetails(), subtotal);
    try {
      await navigator.clipboard.writeText(message);
      toast.success("Commande copiée. Vous pouvez la partager manuellement.");
    } catch {
      toast.error("Copie impossible sur cet appareil.");
    }
  };

  if (lines.length === 0) {
    return (
      <main className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-yellow/30">
            <ShoppingBag className="size-6 text-brand" aria-hidden="true" />
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground">
            Votre panier est vide
          </h1>
          <p className="mt-3 text-foreground/70 font-body">
            Ajoutez quelques plats au panier avant de finaliser votre commande.
          </p>
          <Link
            to="/menu"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand/90"
          >
            Explorer le menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-14">
      <p className="text-xs uppercase tracking-[0.25em] text-yellow-dark font-semibold">Finaliser</p>
      <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mt-2 text-foreground">
        Votre commande
      </h1>
      <p className="mt-3 text-foreground/70 max-w-xl font-body">
        Remplissez vos informations : la commande s'ouvrira dans WhatsApp, prête à envoyer. Vous
        appuyez sur « Envoyer » vous-même.
      </p>

      <div className="mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <fieldset className="bg-cream/85 rounded-2xl p-6 wb-shadow space-y-5">
            <legend className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Informations client
            </legend>

            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground">
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-2 text-sm font-medium text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground">
                Numéro de téléphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="Ex: 0550000000"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
              />
              {errors.phone && (
                <p id="phone-error" role="alert" className="mt-2 text-sm font-medium text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset className="bg-cream/85 rounded-2xl p-6 wb-shadow space-y-5">
            <legend className="font-display text-2xl font-semibold tracking-tight text-foreground">
              Type de commande
            </legend>

            <div className="flex flex-col sm:flex-row gap-3">
              {(
                [
                  { value: "emporter", label: "À emporter" },
                  { value: "livraison", label: "Livraison" },
                ] as const
              ).map((option) => (
                <label
                  key={option.value}
                  className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors ${
                    type === option.value
                      ? "border-yellow bg-yellow/25 text-foreground"
                      : "border-foreground/15 bg-background text-foreground/80 hover:bg-yellow/10"
                  }`}
                >
                  <input
                    type="radio"
                    name="order-type"
                    value={option.value}
                    checked={type === option.value}
                    onChange={() => setType(option.value)}
                    className="size-4 accent-[var(--yellow-dark)]"
                  />
                  {option.label}
                </label>
              ))}
            </div>

            {type === "livraison" && (
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-foreground">
                  Adresse
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  autoComplete="street-address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  aria-invalid={Boolean(errors.address)}
                  aria-describedby={errors.address ? "address-error" : undefined}
                  className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
                />
                {errors.address && (
                  <p id="address-error" role="alert" className="mt-2 text-sm font-medium text-destructive">
                    {errors.address}
                  </p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-foreground">
                Notes / Instructions supplémentaires{" "}
                <span className="font-normal text-foreground/50">(optionnel)</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Ex: Sans oignons, sauce supplémentaire..."
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="mt-2 w-full rounded-xl border border-foreground/15 bg-background px-4 py-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
              />
            </div>
          </fieldset>

          <div className="space-y-3">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-semibold text-cream transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark focus-visible:ring-offset-2"
            >
              Envoyer ma commande via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-yellow hover:border-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-dark"
            >
              <Copy className="size-4" aria-hidden="true" />
              Copier la commande
            </button>
            <p className="text-xs text-foreground/60 text-center font-body">
              Vous pouvez aussi appeler le{" "}
              <a href={`tel:${RESTAURANT_PHONE}`} className="underline underline-offset-2">
                {RESTAURANT_PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        </form>

        <aside className="bg-brand text-cream rounded-2xl p-6 wb-shadow lg:sticky lg:top-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Votre commande</h2>
            <span className="rounded-full bg-yellow px-2.5 py-1 text-xs font-bold text-brand">
              {count}
            </span>
          </div>

          <ul className="mt-5 space-y-4">
            {lines.map((line) => (
              <li key={line.id} className="border-b border-cream/15 pb-4 last:border-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold leading-tight">
                      {lineLabel(line)} <span className="text-cream/70">×{line.qty}</span>
                    </p>
                    <p className="text-xs text-cream/60">{formatDA(line.price)} / unité</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums whitespace-nowrap">
                    {formatDA(line.qty * line.price)}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="[&_button]:text-cream [&_div]:border-cream/25 [&_div]:bg-transparent [&_button:hover]:bg-cream/15">
                    <QuantityStepper
                      qty={line.qty}
                      label={lineLabel(line)}
                      onDecrement={() => decrement(line.id)}
                      onIncrement={() => increment(line.id)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(line.id)}
                    aria-label={`Retirer ${lineLabel(line)} de la commande`}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-cream/70 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
                  >
                    Retirer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-baseline justify-between border-t border-cream/20 pt-4">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/70">Total</span>
            <span className="font-display text-3xl font-bold tabular-nums">{formatDA(subtotal)}</span>
          </div>

          <Link
            to="/menu"
            className="mt-5 inline-flex items-center justify-center text-sm font-semibold text-cream/80 underline underline-offset-4 hover:text-cream"
          >
            ← Ajouter d'autres plats
          </Link>
        </aside>
      </div>
    </main>
  );
}
