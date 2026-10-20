import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { IMG, works, type Block } from "@/data/works";

export function Header() {
  const years = [...new Set(works.map((w) => w.year))].sort();
  return (
    <header className="site-grid items-start pt-4 pb-8">
      <Link to="/" className="col-span-12 md:col-span-4" aria-label="Elvis Milo Federico — home">
        <img src={IMG.logo} alt="Elvis Milo Federico" className="logo-blur w-56 md:w-80" />
      </Link>
      <nav className="col-span-12 md:col-span-4 md:text-center text-meta mt-3 md:mt-1" aria-label="Years">
        {years.map((y, i) => (
          <span key={y}>
            <Link to="/" hash={`y${y}`} className="link">{y}</Link>
            {i < years.length - 1 ? ", " : ""}
          </span>
        ))}
        <div className="text-muted-foreground">pdf portfolio — coming soon</div>
      </nav>
      <nav className="col-span-12 md:col-span-4 md:text-right text-nav mt-3 md:mt-0" aria-label="Main">
        <Link to="/about" className="link block">About me ;)</Link>
        <Link to="/contact" className="link block">Contact</Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-grid py-12 text-meta text-muted-foreground">
      <span className="col-span-6">Elvis Milo Federico</span>
      <span className="col-span-6 text-right">Milan / Antwerpen</span>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen px-4 md:px-6">
      <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
      <Header />
      <main id="main" className="page-in">{children}</main>
      <Footer />
    </div>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="placeholder-tag">{children}</span>;
}

/** Image that opens a full-screen view on click (keyboard accessible). */
export function Zoomable({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="zoom-btn block w-full" aria-label={`Enlarge: ${alt}`}>
        <img src={src} alt={alt} loading="lazy" className={`w-full h-auto ${className ?? ""}`} />
      </button>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={alt} className="lightbox" onClick={() => setOpen(false)}>
          <img src={src.replace(/\/w\/\d+\//, "/w/2400/")} alt={alt} className="max-h-full max-w-full object-contain" />
          <button className="absolute top-4 right-6 text-nav link" autoFocus onClick={() => setOpen(false)}>close</button>
        </div>
      )}
    </>
  );
}

export function Blocks({ blocks, title }: { blocks: Block[]; title: string }) {
  return (
    <div className="space-y-24 md:space-y-40">
      {blocks.map((b, i) => {
        if (b.type === "full")
          return (
            <figure key={i} className="site-grid">
              <div className="col-span-12 md:col-start-2 md:col-span-10"><Zoomable src={b.src} alt={`${title}, view ${i + 1}`} /></div>
              {b.caption && <figcaption className="col-span-12 md:col-start-2 text-meta text-muted-foreground mt-2">{b.caption}</figcaption>}
            </figure>
          );
        if (b.type === "offset")
          return (
            <figure key={i} className="site-grid">
              <div className={`col-span-12 md:col-span-6 ${b.side === "right" ? "md:col-start-7" : "md:col-start-1"}`}>
                <Zoomable src={b.src} alt={`${title}, view ${i + 1}`} />
                {b.caption && <figcaption className="text-meta text-muted-foreground mt-2">{b.caption}</figcaption>}
              </div>
            </figure>
          );
        if (b.type === "pair")
          return (
            <div key={i} className="site-grid gap-y-6">
              {b.items.map((it, j) => (
                <figure key={j} className={`col-span-12 md:col-span-5 ${j === 1 ? "md:col-start-8 md:mt-32" : "md:col-start-1"}`}>
                  <Zoomable src={it.src} alt={`${title}, detail ${j + 1}`} />
                </figure>
              ))}
            </div>
          );
        if (b.type === "vimeo")
          return (
            <div key={i} className="site-grid">
              <div className="col-span-12 md:col-start-3 md:col-span-8 aspect-video">
                <iframe src={`https://player.vimeo.com/video/${b.id}?dnt=1`} title={b.title} className="w-full h-full" allow="fullscreen; picture-in-picture" loading="lazy" />
              </div>
            </div>
          );
        return (
          <div key={i} className="site-grid">
            <p className="col-span-12 md:col-start-7 md:col-span-5 text-body">
              {b.placeholder && <Placeholder>placeholder</Placeholder>} {b.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
