import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode, type ComponentProps } from "react";
import { Facebook, Instagram } from "lucide-react";

import logoAsset from "../assets/west-burger-logo.png.asset.json";
import { CartDrawer, FloatingCartButton } from "../components/CartDrawer";
import { Toaster } from "../components/ui/sonner";
import { CartProvider } from "../lib/cart";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "WestBurger | Burgers, Chicken & Fries in Skikda" },
      { name: "description", content: "WestBurger on Avenue Mostefa Ben Boulaïd, Skikda. Burgers, crispy chicken, poutine, panini and fries. Open 24 hours. Dine-in, takeaway, delivery." },
      { name: "author", content: "WestBurger" },
      { property: "og:title", content: "WestBurger | Burgers, Chicken & Fries in Skikda" },
      { property: "og:description", content: "WestBurger on Avenue Mostefa Ben Boulaïd, Skikda. Burgers, crispy chicken, poutine, panini and fries. Open 24 hours." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "WestBurger" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@westburger" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=DM+Sans:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="max-w-[1200px] mx-auto px-6 pt-8 flex items-center justify-between">
      <Link to="/" className="flex items-center" aria-label="WestBurger — accueil">
        <img
          src={logoAsset.url}
          alt="WestBurger"
          width={512}
          height={430}
          className="h-11 w-auto md:h-14"
        />
      </Link>
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
        <Link to="/menu" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground font-semibold" }}>
          Menu
        </Link>
        <Link to="/reviews" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground font-semibold" }}>
          Reviews
        </Link>
        <Link to="/visit" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground font-semibold" }}>
          Visit
        </Link>
      </nav>
      <a
        href="tel:0658539166"
        className="text-sm font-semibold bg-brand/90 hover:bg-brand text-cream px-5 py-2.5 rounded-full transition-colors"
      >
        Order now
      </a>
    </header>
  );
}

function TikTokIcon({ className, ...props }: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function Footer() {
  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/westburger21", icon: Instagram },
    { name: "Facebook", href: "https://www.facebook.com/WestBurgerskikda/", icon: Facebook },
    { name: "TikTok", href: "https://www.tiktok.com/@westburger.21", icon: TikTokIcon },
  ];

  return (
    <footer className="bg-brand text-cream">
      <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col items-center gap-6">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-yellow grid place-items-center text-brand font-display text-lg font-bold">
              W
            </div>
            <span className="font-display text-xl font-semibold tracking-tight">WestBurger</span>
          </div>
          <p className="text-sm text-cream/70 text-center md:text-left">
            Avenue Mostefa Ben Boulaïd · Skikda · Open 24 hours · 0658 53 91 66
          </p>
          <p className="text-xs text-cream/50">© {new Date().getFullYear()} WestBurger</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WestBurger on ${link.name}`}
                className="grid size-10 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-yellow hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="wb-bg min-h-screen font-body text-foreground antialiased">
          <Header />
          <Outlet />
          <Footer />
          <FloatingCartButton />
          <CartDrawer />
        </div>
        <Toaster position="top-center" />
      </CartProvider>
    </QueryClientProvider>
  );
}
