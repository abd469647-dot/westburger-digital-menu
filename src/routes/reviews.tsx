import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews | WestBurger Skikda" },
      { name: "description", content: "Read what guests say about WestBurger in Skikda. 4.1 stars from 90 Google reviews. Crispy chicken, generous portions and fair prices." },
      { property: "og:title", content: "Reviews | WestBurger Skikda" },
      { property: "og:description", content: "4.1 stars from 90 Google reviews for WestBurger in Skikda." },
      { property: "og:url", content: "/reviews" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

const reviews = [
  {
    name: "Mohamed Atik",
    badge: "Local Guide · 42 reviews",
    rating: 5,
    time: "a month ago",
    text: "The waiting period is long, but I recommend the crispy chicken. Worth it.",
  },
  {
    name: "ACIL Gaming",
    badge: "Local Guide · 35 reviews · 38 photos",
    rating: 5,
    time: "11 months ago",
    text: "Very well made with good quality cheese and generous portions. 7/10 — will visit again.",
    response: "Thank you so much, it's a huge pleasure 😊 We'll be changing stores in the next few days. Welcome for a better experience 🙏",
  },
  {
    name: "Khalfaoui Seif Eddine",
    badge: "4 reviews · 17 photos",
    rating: 5,
    time: "4 years ago",
    text: "أحسن بلاصة تروحو ليها. البنة مش نورمال، عمال ناس ملاح والسعر يستاهل. The place is small and ventilation is limited, but everything else is great.",
    response: "💯",
  },
  {
    name: "Visitor",
    badge: "Dine-in",
    rating: 5,
    time: "a year ago",
    text: "The best burger with affordable prices — we're happy that Google Maps brought us here.",
  },
];

function ReviewsPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-6 py-14">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.25em] text-yellow-dark font-semibold">Google reviews</p>
          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight mt-2 text-foreground">
            4.1<span className="text-yellow-dark">/5</span>
          </h1>
          <p className="text-sm text-foreground/60 mt-2 font-body">90 reviews · Google Maps</p>

          <div className="mt-8 space-y-1.5">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-[11px] w-3 text-foreground/50 font-body">{star}</span>
                <div className="h-1.5 flex-1 rounded-full bg-foreground/10">
                  <div
                    className="h-full rounded-full bg-yellow"
                    style={{
                      width:
                        star === 5 ? "60%" : star === 4 ? "25%" : star === 3 ? "10%" : "2%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=WestBurger+Skikda"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 text-sm font-semibold underline underline-offset-4 decoration-2 hover:opacity-70"
          >
            Write a review on Google →
          </a>
        </div>

        <div className="lg:col-span-8 space-y-4">
          {reviews.map((review, index) => (
            <figure
              key={`${review.name}-${index}`}
              className="bg-cream rounded-2xl p-6 wb-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-yellow-dark text-sm">{renderStars(review.rating)}</div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-body">
                  {review.time}
                </span>
              </div>
              <blockquote className="text-foreground/85 text-pretty font-body leading-relaxed">
                "{review.text}"
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-foreground text-sm">{review.name}</span>
                <span className="text-xs text-foreground/40 font-body">{review.badge}</span>
              </figcaption>
              {review.response && (
                <div className="mt-4 bg-white rounded-xl p-4 border-l-4 border-yellow">
                  <p className="text-xs uppercase tracking-[0.15em] text-foreground/50 font-semibold mb-1">
                    Response from the owner
                  </p>
                  <p className="text-sm text-foreground/80 font-body">{review.response}</p>
                </div>
              )}
            </figure>
          ))}
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

function renderStars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}
