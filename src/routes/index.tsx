import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Placeholder } from "@/components/site";
import { ABOUT, CONTACT, works, type Work } from "@/data/works";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Elvis Milo Federico — artist" },
      { name: "description", content: "Site-specific art, installation, sculpture, photography and moving image by Elvis Milo Federico. Milan / Antwerpen." },
      { property: "og:title", content: "Elvis Milo Federico — artist" },
      { property: "og:description", content: "Selected works: installation, sculpture, photography, moving image." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// Staggered rhythm inside the 10-column works area (two per row, alternating offsets).
const SLOTS = [
  "md:col-start-1 md:col-span-4",
  "md:col-start-6 md:col-span-4 md:mt-28",
  "md:col-start-3 md:col-span-4",
  "md:col-start-8 md:col-span-3 md:mt-16",
  "md:col-start-1 md:col-span-3 md:mt-10",
  "md:col-start-5 md:col-span-5",
];

function Card({ w, i }: { w: Work; i: number }) {
  return (
    <Link to="/works/$slug" params={{ slug: w.slug }} className="work-card block w-fit max-w-full mx-auto">
      {w.cover ? (
        <img src={w.cover} alt={w.title} loading={i < 2 ? "eager" : "lazy"} className="img-fade block w-auto max-w-full h-auto max-h-[60vh] object-contain" />
      ) : w.video ? (
        <div className="aspect-video w-[min(100%,40rem)] md:w-[32rem] max-w-full pointer-events-none">
          <iframe
            src={`https://player.vimeo.com/video/${w.video}?autoplay=1&muted=1&loop=1&background=1&controls=0&dnt=1`}
            title={w.title} className="w-full h-full" allow="autoplay" tabIndex={-1}
          />
        </div>
      ) : (
        <div className="image-slot aspect-video w-[32rem] max-w-full">moving image</div>
      )}
      {/* w-0 min-w-full: caption takes the picture's width and never pushes past its edges */}
      <div className="w-0 min-w-full mt-2 flex justify-between gap-4 text-meta">
        <span className="work-title">{w.title}</span>
        <span className="text-muted-foreground shrink-0">{w.year > 0 ? w.year : <Placeholder>year tbc</Placeholder>}</span>
      </div>
    </Link>
  );
}

function Index() {
  const years = [...new Set(works.map((w) => w.year))].sort((a, b) => b - a);
  return (
    <Page>
      {years.map((y) => (
        <section key={y} id={`y${y}`} className="site-grid mb-32 gap-y-8 scroll-mt-6" aria-labelledby={`h${y}`}>
          <h2 id={`h${y}`} className="col-span-12 md:col-span-2 text-nav md:sticky md:top-6 self-start">
            {y > 0 ? y : <Placeholder>year to be confirmed</Placeholder>}
          </h2>
          <ul className="col-span-12 md:col-span-10 grid grid-cols-1 md:grid-cols-10 gap-x-6 gap-y-20 md:gap-y-24 items-start">
            {works.filter((w) => w.year === y).map((w, i) => (
              <li key={w.slug} className={SLOTS[i % SLOTS.length]}>
                <Card w={w} i={i} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="site-grid mb-24 gap-y-6" aria-labelledby="about-h">
        <h2 id="about-h" className="col-span-12 md:col-span-3 text-nav">About</h2>
        <p className="col-span-12 md:col-span-6 text-body">
          {ABOUT.split("\n")[0]}{" "}
          <Link to="/about" className="link">Full biography →</Link>
        </p>
      </section>

      <section className="site-grid mb-24 gap-y-2 text-body" aria-labelledby="contact-h">
        <h2 id="contact-h" className="col-span-12 md:col-span-3 text-nav">Contact</h2>
        <div className="col-span-12 md:col-span-6">
          <p>You can book me for a 3D consultation and 3D related jobs, photography and video editing :)</p>
          <p className="mt-4"><a className="link" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p><a className="link" href={CONTACT.instagram} target="_blank" rel="noreferrer">{CONTACT.instagramHandle}</a></p>
          <p className="text-muted-foreground">{CONTACT.base}</p>
        </div>
      </section>

    </Page>
  );
}
