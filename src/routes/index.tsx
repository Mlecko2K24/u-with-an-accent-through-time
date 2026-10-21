import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Placeholder } from "@/components/site";
import { ABOUT, CONTACT, RUNNING_VIDEO, works } from "@/data/works";

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

// Rhythm of positions across the 12-col grid — keeps the index asymmetric but controlled.
const SLOTS = [
  "md:col-start-5 md:col-span-4",
  "md:col-start-1 md:col-span-4",
  "md:col-start-9 md:col-span-4 md:-mt-24",
  "md:col-start-3 md:col-span-4",
  "md:col-start-9 md:col-span-3",
  "md:col-start-1 md:col-span-4",
  "md:col-start-8 md:col-span-4 md:mt-40",
];

function Index() {
  const years = [...new Set(works.map((w) => w.year))].filter((y) => y > 0).sort((a, b) => b - a);
  const undated = works.filter((w) => w.year === 0);
  return (
    <Page closingLandscape>
      {years.map((y) => (
        <section key={y} id={`y${y}`} className="mb-32" aria-labelledby={`h${y}`}>
          <h2 id={`h${y}`} className="text-meta text-muted-foreground mb-8">Selection of works from {y}</h2>
          <ul className="site-grid gap-y-20 md:gap-y-28">
            {works.filter((w) => w.year === y).map((w, i) => (
              <li key={w.slug} className={`col-span-12 ${SLOTS[i % SLOTS.length]}`}>
                <Link to="/works/$slug" params={{ slug: w.slug }} className="work-card block">
                  {w.cover ? (
                    <img src={w.cover} alt={w.title} loading={i < 2 ? "eager" : "lazy"} className="mx-auto w-auto max-w-full h-auto max-h-[60vh] object-contain" />
                  ) : (
                    <div className="image-slot aspect-video">moving image</div>
                  )}
                  <div className="mt-2 flex justify-between gap-4 text-meta">
                    <span className="work-title">{w.title}</span>
                    <span className="text-muted-foreground">{w.year}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {undated.length > 0 && (
        <section className="mb-32" aria-labelledby="undated-h">
          <h2 id="undated-h" className="text-meta text-muted-foreground mb-8">
            <Placeholder>year to be confirmed</Placeholder>
          </h2>
          <ul className="site-grid gap-y-20 md:gap-y-28">
            {undated.map((w, i) => (
              <li key={w.slug} className={`col-span-12 ${SLOTS[i % SLOTS.length]}`}>
                <Link to="/works/$slug" params={{ slug: w.slug }} className="work-card block">
                  {w.cover ? (
                    <img src={w.cover} alt={w.title} loading="lazy" className="mx-auto w-auto max-w-full h-auto max-h-[60vh] object-contain" />
                  ) : (
                    <div className="image-slot aspect-video">moving image</div>
                  )}
                  <div className="mt-2 flex justify-between gap-4 text-meta">
                    <span className="work-title">{w.title}</span>
                    <span className="text-muted-foreground">year tbc</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

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

      <section className="site-grid gap-y-10" aria-label="Running video">
        <div className="col-span-12 md:col-start-2 md:col-span-10 aspect-video">
          <iframe
            src={`https://player.vimeo.com/video/${RUNNING_VIDEO.id}?autoplay=1&muted=1&loop=1&background=1&dnt=1`}
            title={RUNNING_VIDEO.title}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </section>
    </Page>
  );
}
