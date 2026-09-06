import { createFileRoute, Link } from "@tanstack/react-router";

import mapImg from "@/assets/map.jpg";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit | WestBurger Skikda" },
      { name: "description", content: "Visit WestBurger on Avenue Mostefa Ben Boulaïd, Skikda. Open 24 hours. Dine-in, takeaway, delivery. Call 0658 53 91 66." },
      { property: "og:title", content: "Visit | WestBurger Skikda" },
      { property: "og:description", content: "WestBurger is on Avenue Mostefa Ben Boulaïd, Skikda. Open 24 hours. Call 0658 53 91 66." },
      { property: "og:url", content: "/visit" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/visit" }],
  }),
  component: VisitPage,
});

function VisitPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-14">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-dark font-semibold">Come by</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mt-2 text-foreground">
            Find us in Skikda
          </h1>
          <p className="mt-4 text-foreground/70 max-w-md font-body">
            Easy to spot on Avenue Mostefa Ben Boulaïd. Open all day and all night for dine-in, takeaway or delivery.
          </p>

          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-yellow grid place-items-center text-foreground font-bold shrink-0">
                📍
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-semibold">Address</p>
                <p className="text-lg font-display mt-0.5">Avenue Mostefa Ben Boulaïd, Skikda, Algeria</p>
                <p className="text-sm text-foreground/60 font-body mt-1">Plus code: VWJ4+PG Skikda</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-yellow grid place-items-center text-foreground font-bold shrink-0">
                🕐
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-semibold">Hours</p>
                <p className="text-lg font-display mt-0.5">Open 24 hours</p>
                <p className="text-sm text-foreground/60 font-body mt-1">Every day, all week</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-yellow grid place-items-center text-foreground font-bold shrink-0">
                📞
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-semibold">Phone</p>
                <a href="tel:0658539166" className="text-lg font-display mt-0.5 block hover:text-yellow-dark transition-colors">
                  0658 53 91 66
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-10 rounded-full bg-yellow grid place-items-center text-foreground font-bold shrink-0">
                📸
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 font-semibold">Social</p>
                <a
                  href="https://www.instagram.com/westburger21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-display mt-0.5 block hover:text-yellow-dark transition-colors"
                >
                  westburger21
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <span className="px-4 py-2 rounded-full border border-foreground/10 text-sm font-medium bg-cream">Dine-in</span>
            <span className="px-4 py-2 rounded-full border border-foreground/10 text-sm font-medium bg-cream">Takeaway</span>
            <span className="px-4 py-2 rounded-full border border-foreground/10 text-sm font-medium bg-cream">Delivery</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=WestBurger,Avenue+Mostefa+Ben+Boulaid,Skikda,Algeria"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center bg-yellow hover:bg-yellow-dark text-foreground font-semibold px-7 py-3.5 rounded-full text-sm transition-colors wb-shadow"
            >
              Get directions
            </a>
            <a
              href="tel:0658539166"
              className="inline-flex items-center justify-center bg-brand text-cream hover:bg-brand/90 font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
            >
              Call now
            </a>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden wb-shadow">
          <img
            src={mapImg}
            alt="Map showing WestBurger location on Avenue Mostefa Ben Boulaïd, Skikda"
            width={944}
            height={704}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-cream/95 backdrop-blur-md px-4 py-3 wb-shadow flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-foreground/50 font-semibold">WestBurger</p>
              <p className="text-sm font-medium">Avenue Mostefa Ben Boulaïd</p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=WestBurger,Avenue+Mostefa+Ben+Boulaid,Skikda,Algeria"
              target="_blank"
              rel="noreferrer"
              className="bg-yellow hover:bg-yellow-dark text-foreground font-semibold text-sm px-4 py-2 rounded-full transition-colors shrink-0"
            >
              Directions
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
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
