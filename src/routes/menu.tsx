import { createFileRoute, Link } from "@tanstack/react-router";

import { AddToCartButtons, AddSupplementButton } from "@/components/AddToCartButtons";
import { CategoryNav } from "@/components/CategoryNav";
import { menuCategories } from "@/data/menu";
import { supplementOptions } from "@/lib/menu-options";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | WestBurger Skikda" },
      { name: "description", content: "The full WestBurger menu: entrées, pizzas, panini, smash burgers, burgers, tacos, fake poutine, bankai, desserts and drinks. Open 24 hours in Skikda." },
      { property: "og:title", content: "Menu | WestBurger Skikda" },
      { property: "og:description", content: "Entrées, pizzas, panini, smash burgers, tacos, fake poutine and more at WestBurger, Skikda." },
      { property: "og:url", content: "/menu" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-dark font-semibold">From the counter</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mt-2 text-foreground">
            Full menu
          </h1>
          <p className="mt-3 text-foreground/70 max-w-lg font-body">
            Entrées, pizzas, panini, smash burgers, tacos, fake poutine, bankai, desserts and drinks — served 24 hours.
          </p>
        </div>
        <a
          href="tel:0658539166"
          className="inline-flex items-center justify-center bg-brand text-cream font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand/90 transition-colors wb-shadow shrink-0"
        >
          Call to order · 0658 53 91 66
        </a>
      </div>

      <nav
        aria-label="Menu categories"
        className="sticky top-0 z-20 -mx-6 px-6 py-3 bg-background/90 backdrop-blur-md border-b border-foreground/10 overflow-hidden"
      >
        <CategoryNav>
          {menuCategories.map((category) => (
            <li key={category.id}>
              <a
                href={`#${category.id}`}
                className="inline-block whitespace-nowrap rounded-full border border-foreground/15 bg-cream/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:bg-yellow hover:border-yellow transition-colors"
              >
                {category.name}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#supplement"
              className="inline-block whitespace-nowrap rounded-full border border-foreground/15 bg-cream/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:bg-yellow hover:border-yellow transition-colors"
            >
              Supplément
            </a>
          </li>
        </CategoryNav>
      </nav>

      {menuCategories.map((category) => (
        <section key={category.id} id={category.id} className="pt-14 scroll-mt-24">
          <div className="mb-6">
            <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              {category.name}
            </h2>
            {category.tagline && (
              <p className="mt-2 text-sm text-foreground/60 font-body italic">{category.tagline}</p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.items.map((item) => (
              <article
                key={`${category.id}-${item.name}`}
                className="bg-cream/85 rounded-2xl p-4 wb-shadow hover:-translate-y-1 transition-transform duration-300 flex flex-col"
              >
                <img
                  src={item.img}
                  alt={item.alt}
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover rounded-xl mb-4"
                />
                <div className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-3">
                  <h3 className="font-display text-xl font-semibold leading-tight">{item.name}</h3>
                  {item.price && (
                    <span className="text-base md:text-lg font-bold text-yellow-dark whitespace-nowrap">
                      {item.price}
                    </span>
                  )}
                </div>
                {item.desc && (
                  <p className="mt-3 text-sm text-foreground/70 leading-snug font-body">{item.desc}</p>
                )}
                {item.variants && (
                  <ul className="mt-3 space-y-1.5">
                    {item.variants.map((variant) => (
                      <li
                        key={variant.label}
                        className="flex items-baseline justify-between gap-3 text-sm font-body"
                      >
                        <span className="text-foreground/70">{variant.label}</span>
                        <span className="font-bold text-foreground/90">{variant.price}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto">
                  <AddToCartButtons category={category} item={item} />
                </div>
              </article>
            ))}
          </div>

          {category.notes && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {category.notes.map((note) => (
                <li
                  key={note.label}
                  className="rounded-full border border-yellow bg-yellow/20 px-4 py-2 text-sm font-semibold"
                >
                  {note.label} <span className="text-yellow-dark">{note.price}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section id="supplement" className="pt-14 scroll-mt-24">
        <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
          Supplément
        </h2>
        <p className="mt-2 text-sm text-foreground/60 font-body italic">
          Sauce maison, fromages de qualité, légumes frais.
        </p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {supplements.map((group) => (
            <div key={group.group} className="bg-cream/85 rounded-2xl p-5 wb-shadow">
              <div className="text-[10px] uppercase tracking-[0.3em] text-yellow-dark font-semibold mb-3">
                {group.group}
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.label} className="flex items-baseline justify-between gap-3 text-sm font-body">
                    <span className="text-foreground/75">{item.label}</span>
                    <span className="font-bold text-foreground/90 whitespace-nowrap">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-14 bg-brand text-cream rounded-3xl p-8 md:p-10 wb-shadow">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Order your way</h2>
            <p className="mt-3 text-cream/70 font-body">
              Dine-in, takeaway or delivery. Open 24 hours, so you can satisfy the craving whenever it hits.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full border border-cream/20 text-sm font-medium">Dine-in</span>
            <span className="px-4 py-2 rounded-full border border-cream/20 text-sm font-medium">Takeaway</span>
            <span className="px-4 py-2 rounded-full border border-cream/20 text-sm font-medium">Delivery</span>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center text-sm font-semibold underline underline-offset-4 decoration-2 hover:opacity-70"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
