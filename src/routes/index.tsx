import { createFileRoute, Link } from "@tanstack/react-router";

import heroBurger from "@/assets/hero-burger.jpg";
import poutineImg from "@/assets/poutine.jpg";
import crispyChickenImg from "@/assets/crispy-chicken.jpg";
import paniniImg from "@/assets/panini.jpg";
import friesImg from "@/assets/fries.jpg";
import interiorImg from "@/assets/interior.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WestBurger | Burgers, Chicken & Fries in Skikda" },
      { name: "description", content: "WestBurger on Avenue Mostefa Ben Boulaïd, Skikda. Burgers, crispy chicken, poutine, panini and fries. Open 24 hours. Dine-in, takeaway, delivery." },
      { property: "og:title", content: "WestBurger | Burgers, Chicken & Fries in Skikda" },
      { property: "og:description", content: "WestBurger on Avenue Mostefa Ben Boulaïd, Skikda. Open 24 hours. Dine-in, takeaway, delivery." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      <Hero />
      <MenuHighlights />
      <ReviewsTeaser />
      <VisitSection />
    </main>
  );
}

function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-14 pb-10 grid md:grid-cols-12 gap-10 items-center">
      <div className="md:col-span-6">
        <div className="inline-flex items-center gap-2 bg-cream/80 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground/80 mb-6 border border-yellow/30">
          <span className="text-yellow-dark">★★★★★</span> 4.1 · 90 reviews · Open 24 hours
        </div>
        <h1 className="font-display text-6xl md:text-7xl font-semibold leading-[0.95] tracking-tight text-foreground">
          The best burger,
          <span className="italic text-yellow-dark"> affordable</span>,
          every single night.
        </h1>
        <p className="mt-6 text-lg text-foreground/75 max-w-md leading-relaxed font-body">
          Crispy chicken, honest portions and good-quality cheese on Avenue Mostefa Ben Boulaïd, Skikda. Dine-in, takeaway or delivery — around DZD 1–1,000 per person.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/menu"
            className="bg-yellow hover:bg-yellow-dark text-foreground font-semibold px-7 py-3.5 rounded-full text-sm transition-colors wb-shadow"
          >
            See full menu
          </Link>
          <a
            href="tel:0658539166"
            className="text-foreground font-semibold underline underline-offset-4 decoration-2 px-2 py-3.5 text-sm hover:opacity-70"
          >
            Call 0658 53 91 66
          </a>
        </div>
        <div className="mt-10 flex gap-8">
          <div>
            <div className="font-display text-3xl font-semibold">24h</div>
            <div className="text-xs uppercase tracking-widest text-foreground/60">Always open</div>
          </div>
          <div>
            <div className="font-display text-3xl font-semibold">3 ways</div>
            <div className="text-xs uppercase tracking-widest text-foreground/60">Dine · Take · Deliver</div>
          </div>
          <div>
            <div className="font-display text-3xl font-semibold">DZD 1k</div>
            <div className="text-xs uppercase tracking-widest text-foreground/60">Per person</div>
          </div>
        </div>
      </div>

      <div className="md:col-span-6 relative">
        <img
          src={heroBurger}
          alt="Crispy chicken burger with melted cheese and golden fries at WestBurger Skikda"
          width={1088}
          height={1280}
          className="w-full aspect-[4/5] object-cover rounded-3xl wb-shadow"
        />
        <div className="absolute -bottom-6 -left-6 bg-cream rounded-2xl px-5 py-4 wb-shadow max-w-[220px]">
          <div className="text-yellow-dark text-sm">★★★★★</div>
          <p className="text-sm text-foreground/80 mt-1 leading-snug font-body">
            "Very well made with good quality cheese and portions."
          </p>
          <p className="text-xs text-foreground/50 mt-2 font-medium">ACIL Gaming · Local Guide</p>
        </div>
      </div>
    </section>
  );
}

function MenuHighlights() {
  const items = [
    { name: "Fake Poutine", price: "DZD 600", desc: "Fries, curds and house gravy.", img: poutineImg, alt: "Fake poutine with fries, cheese curds and rich gravy" },
    { name: "Crispy Chicken", price: "DZD 850", desc: "The guest favourite, always.", img: crispyChickenImg, alt: "Crispy chicken burger with lettuce and melted cheese" },
    { name: "Panini", price: "DZD 700", desc: "Pressed, cheesy, generous.", img: paniniImg, alt: "Loaded pressed panini with melted cheese" },
    { name: "French Fries", price: "DZD 350", desc: "Crisp, golden, big portions.", img: friesImg, alt: "Crispy golden french fries with dipping sauce" },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-dark font-semibold">From the counter</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mt-2 text-foreground">
            Menu &amp; highlights
          </h2>
        </div>
        <Link
          to="/menu"
          className="hidden sm:inline text-sm font-semibold underline underline-offset-4 decoration-2 hover:opacity-70"
        >
          Full menu →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <div key={item.name} className="group">
            <img
              src={item.img}
              alt={item.alt}
              width={800}
              height={1008}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover rounded-2xl mb-4 wb-shadow group-hover:scale-[1.02] transition-transform duration-300"
            />
            <div className="bg-cream/85 rounded-2xl p-5 wb-shadow">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                <span className="text-sm font-bold text-yellow-dark">{item.price}</span>
              </div>
              <p className="text-sm text-foreground/70 mt-2 leading-snug font-body">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsTeaser() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="bg-cream rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 wb-shadow items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-dark font-semibold">Word of mouth</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mt-2 text-foreground">
            Loved by locals.
          </h2>
          <p className="mt-4 text-foreground/70 max-w-md font-body">
            90 reviews and counting. Guests keep coming back for the crispy chicken, generous portions and fair prices.
          </p>
          <Link
            to="/reviews"
            className="inline-block mt-6 text-sm font-semibold underline underline-offset-4 decoration-2 hover:opacity-70"
          >
            Read all reviews →
          </Link>
        </div>
        <div className="space-y-4">
          <figure className="bg-white rounded-2xl p-5 wb-shadow">
            <div className="text-yellow-dark text-sm mb-2">★★★★★</div>
            <blockquote className="text-sm text-foreground/80 font-body">
              "Very well made with good quality cheese and portions. I'll be coming back."
            </blockquote>
            <figcaption className="mt-3 text-xs font-semibold text-foreground/50">ACIL Gaming · Local Guide · 35 reviews</figcaption>
          </figure>
          <figure className="bg-white rounded-2xl p-5 wb-shadow">
            <div className="text-yellow-dark text-sm mb-2">★★★★★</div>
            <blockquote className="text-sm text-foreground/80 font-body">
              "The best burger with affordable prices — we're glad Google Maps led us here."
            </blockquote>
            <figcaption className="mt-3 text-xs font-semibold text-foreground/50">Visitor · a year ago</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function VisitSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-20">
      <div className="bg-brand text-cream rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-10 wb-shadow">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow font-semibold">Come by</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mt-2 leading-tight">
            Find us in Skikda
          </h2>
          <p className="text-cream/70 mt-4 leading-relaxed font-body">
            Avenue Mostefa Ben Boulaïd, Skikda<br />Plus code: VWJ4+PG
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cream/50">Hours</p>
            <p className="font-display text-xl mt-1">Open 24 hours</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cream/50">Reach us</p>
            <p className="font-display text-xl mt-1">0658 53 91 66</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cream/50">Follow</p>
            <p className="font-display text-xl mt-1">instagram.com</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <img
            src={interiorImg}
            alt="Cozy interior of WestBurger restaurant in Skikda"
            width={944}
            height={704}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover rounded-2xl"
          />
          <Link
            to="/visit"
            className="bg-yellow hover:bg-yellow-dark text-foreground font-semibold text-center px-6 py-3.5 rounded-full text-sm transition-colors"
          >
            Get directions
          </Link>
        </div>
      </div>
    </section>
  );
}
