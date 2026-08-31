import { createFileRoute, Link } from "@tanstack/react-router";

import poutineImg from "@/assets/poutine.jpg";
import crispyChickenImg from "@/assets/crispy-chicken.jpg";
import paniniImg from "@/assets/panini.jpg";
import friesImg from "@/assets/fries.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | WestBurger Skikda" },
      { name: "description", content: "WestBurger menu: burgers, crispy chicken, fake poutine, panini, fries, tacos and more. Open 24 hours on Avenue Mostefa Ben Boulaïd, Skikda." },
      { property: "og:title", content: "Menu | WestBurger Skikda" },
      { property: "og:description", content: "Burgers, crispy chicken, fake poutine, panini and fries at WestBurger, Skikda." },
      { property: "og:url", content: "/menu" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

const menuItems = [
  { category: "Signatures", name: "Crispy Chicken Burger", price: "DZD 850", desc: "Buttermilk-fried fillet, lettuce, pickles, tangy mayo. The guest favourite.", img: crispyChickenImg, alt: "Crispy chicken burger" },
  { category: "Signatures", name: "Classic Smash Burger", price: "DZD 750", desc: "Double smashed patties, aged cheddar, house sauce, toasted bun.", img: null, alt: "" },
  { category: "Signatures", name: "Spicy Chicken Burger", price: "DZD 880", desc: "Crispy fillet with a kick, slaw, jalapeño mayo.", img: null, alt: "" },
  { category: "Sides", name: "Fake Poutine", price: "DZD 600", desc: "Crispy fries, cheese curds and rich house gravy.", img: poutineImg, alt: "Fake poutine" },
  { category: "Sides", name: "French Fries", price: "DZD 350", desc: "Crisp, golden and seasoned. Best with a dip.", img: friesImg, alt: "French fries" },
  { category: "Grill", name: "Panini", price: "DZD 700", desc: "Pressed and golden with melted cheese and your choice of filling.", img: paniniImg, alt: "Pressed panini" },
  { category: "Grill", name: "Chicken Tacos", price: "DZD 600", desc: "Two soft tacos, pulled chicken, slaw, lime crema.", img: null, alt: "" },
  { category: "Drinks", name: "Soft Drinks", price: "DZD 150", desc: "Coke, Fanta, Sprite and more.", img: null, alt: "" },
];

function MenuPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-dark font-semibold">From the counter</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mt-2 text-foreground">
            Full menu
          </h1>
          <p className="mt-3 text-foreground/70 max-w-lg font-body">
            Hand-built burgers, crispy chicken and honest sides. Prices around DZD 1–1,000 per person.
          </p>
        </div>
        <a
          href="tel:0658539166"
          className="inline-flex items-center justify-center bg-brand text-cream font-semibold px-6 py-3 rounded-full text-sm hover:bg-brand/90 transition-colors wb-shadow shrink-0"
        >
          Call to order · 0658 53 91 66
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {menuItems.map((item, index) => (
          <article
            key={item.name}
            className="bg-cream/85 rounded-2xl p-5 wb-shadow hover:-translate-y-1 transition-transform duration-300"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            {item.img && (
              <img
                src={item.img}
                alt={item.alt}
                width={800}
                height={1008}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover rounded-xl mb-4"
              />
            )}
            <div className="text-[10px] uppercase tracking-[0.3em] text-yellow-dark font-semibold mb-3">
              {item.category}
            </div>
            <div className="flex items-baseline justify-between gap-3 border-b border-foreground/10 pb-3">
              <h3 className="font-display text-xl font-semibold">{item.name}</h3>
              <span className="text-lg font-bold text-foreground/90">{item.price}</span>
            </div>
            <p className="mt-3 text-sm text-foreground/70 leading-snug font-body">{item.desc}</p>
          </article>
        ))}
      </div>

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
