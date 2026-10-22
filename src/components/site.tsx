import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { IMG, works, type Block } from "@/data/works";

export function Header() {
  const years = [...new Set(works.map((w) => w.year))].filter((y) => y > 0).sort();
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
      </nav>
      <nav className="col-span-12 md:col-span-4 md:text-right text-nav mt-3 md:mt-0" aria-label="Main">
        <Link to="/about" className="link block">About me ;)</Link>
        <Link to="/contact" className="link block">Contact</Link>
      </nav>
    </header>
  );
}

/** Quiet return-to-top; name and base live in Contact, so nothing is repeated here. */
export function Footer() {
  return (
    <footer className="py-12 text-meta text-right">
      <a href="#top" className="link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        ↑ top
      </a>
    </footer>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div id="top" className="min-h-screen px-4 md:px-6">
      <a href="#main" className="sr-only focus:not-sr-only">Skip to content</a>
      <Header />
      <main id="main" className="page-in">{children}</main>
      <Footer />
      <img src={IMG.cutout} alt="" aria-hidden="true" className="flying-cutout" />
      <figure className="-mx-4 md:-mx-6">
        <img src={IMG.landscape} alt="3D rendered landscape" className="block w-full h-auto border-0" />
      </figure>
    </div>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="placeholder-tag">{children}</span>;
}

type Shot = { src: string; alt: string };

/** Image button that opens the shared gallery lightbox. */
function Zoomable({ shot, onOpen }: { shot: Shot; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="zoom-btn block w-full" aria-label={`Enlarge: ${shot.alt}`}>
      <img src={shot.src} alt={shot.alt} loading="lazy" className="img-fade mx-auto w-auto max-w-full h-auto max-h-[75vh] object-contain" />
    </button>
  );
}

/** Full-screen viewer; images vanish into each other (crossfade), never slide. */
function Lightbox({ shots, index, setIndex, onClose }: { shots: Shot[]; index: number; setIndex: (i: number) => void; onClose: () => void }) {
  const n = shots.length;
  const go = (d: number) => setIndex((index + d + n) % n);
  const touchX = useRef<number | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  });
  const shot = shots[index]!;
  return (
    <div
      role="dialog" aria-modal="true" aria-label={shot.alt} className="lightbox" onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0]!.clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0]!.clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <img key={index} src={shot.src.replace(/\/w\/\d+\//, "/w/2400/")} alt={shot.alt} className="lightbox-vanish max-h-full max-w-full object-contain" />
      <button className="absolute top-4 right-6 text-nav link" autoFocus onClick={onClose}>close</button>
      {n > 1 && (
        <>
          <button aria-label="Previous image" className="lightbox-arrow left-2 md:left-6" onClick={(e) => { e.stopPropagation(); go(-1); }}>←</button>
          <button aria-label="Next image" className="lightbox-arrow right-2 md:right-6" onClick={(e) => { e.stopPropagation(); go(1); }}>→</button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-meta text-muted-foreground">{index + 1} / {n}</span>
        </>
      )}
    </div>
  );
}

export function Blocks({ blocks, title }: { blocks: Block[]; title: string }) {
  const shots: Shot[] = [];
  const add = (src: string) => (shots.push({ src, alt: `${title}, view ${shots.length + 1}` }), shots.length - 1);
  const [open, setOpen] = useState<number | null>(null);
  const pic = (src: string) => { const i = add(src); return <Zoomable shot={shots[i]!} onOpen={() => setOpen(i)} />; };

  const rendered = blocks.map((b, i) => {
    if (b.type === "full")
      return (
        <figure key={i} className="site-grid">
          <div className="col-span-12 md:col-start-2 md:col-span-10">{pic(b.src)}</div>
          {b.caption && <figcaption className="col-span-12 md:col-start-2 text-meta text-muted-foreground mt-2">{b.caption}</figcaption>}
        </figure>
      );
    if (b.type === "offset")
      return (
        <figure key={i} className="site-grid">
          <div className={`col-span-12 md:col-span-6 ${b.side === "right" ? "md:col-start-6" : "md:col-start-2"}`}>
            {pic(b.src)}
            {b.caption && <figcaption className="text-meta text-muted-foreground mt-2">{b.caption}</figcaption>}
          </div>
        </figure>
      );
    if (b.type === "pair")
      return (
        <div key={i} className="site-grid gap-y-10 items-center">
          {b.items.map((it, j) => (
            <figure key={j} className={`col-span-12 md:col-span-5 ${j === 1 ? "md:col-start-7" : "md:col-start-1"}`}>
              {pic(it.src)}
            </figure>
          ))}
        </div>
      );
    if (b.type === "vimeo")
      return (
        <div key={i} className="site-grid">
          <div className="col-span-12 md:col-start-2 md:col-span-10 aspect-video">
            <iframe src={`https://player.vimeo.com/video/${b.id}?dnt=1`} title={b.title} className="w-full h-full" allow="fullscreen; picture-in-picture" loading="lazy" />
          </div>
        </div>
      );
    return (
      <div key={i} className="site-grid">
        <div className="col-span-12 md:col-start-3 md:col-span-7 text-body whitespace-pre-line max-w-[68ch]">
          {b.placeholder && <Placeholder>placeholder</Placeholder>} {b.body}
        </div>
      </div>
    );
  });

  return (
    <div className="space-y-16 md:space-y-28">
      {rendered}
      {open !== null && <Lightbox shots={shots} index={open} setIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}
