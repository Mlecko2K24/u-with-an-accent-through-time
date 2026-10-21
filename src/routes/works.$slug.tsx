import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Blocks, Page, Placeholder } from "@/components/site";
import { getWork, works } from "@/data/works";

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const work = getWork(params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.work.title} (${loaderData.work.year}) — Elvis Milo Federico` : "Work not found — Elvis Milo Federico";
    const d = loaderData ? `${loaderData.work.title}, ${loaderData.work.year}. Work by Elvis Milo Federico.` : "This work could not be found.";
    const img = loaderData?.work.cover;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(img ? [{ property: "og:image", content: img }, { name: "twitter:image", content: img }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <Page><p className="text-body">This work doesn't exist. <Link to="/" className="link">Back to works</Link></p></Page>
  ),
  component: WorkPage,
});

function WorkPage() {
  const { work } = Route.useLoaderData();
  const idx = works.findIndex((w) => w.slug === work.slug);
  const next = works[(idx + 1) % works.length]!;
  const meta: [string, string | undefined][] = [
    ["Year", work.year > 0 ? String(work.year) : undefined],
    ["Location", work.location],
    ["Medium", work.medium],
    ["Type", work.kind],
  ];
  return (
    <Page>
      <article>
        <header className="site-grid mb-20 gap-y-6">
          <h1 className="col-span-12 md:col-span-7 text-display">{work.title}</h1>
          <dl className="col-span-12 md:col-start-9 md:col-span-4 text-meta grid grid-cols-[6rem_1fr] gap-y-1">
            {meta.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-muted-foreground">{k}</dt>
                <dd>{v ?? <span className="text-muted-foreground">—  to be supplied</span>}</dd>
              </div>
            ))}
            {work.placeholder && <dd className="col-span-2 mt-2"><Placeholder>information incomplete</Placeholder></dd>}
          </dl>
        </header>
        <Blocks blocks={work.blocks} title={work.title} />
      </article>
      <nav className="site-grid mt-32 text-nav" aria-label="More works">
        <Link to="/" className="link col-span-6">← all works</Link>
        <Link to="/works/$slug" params={{ slug: next.slug }} className="link col-span-6 text-right">next: {next.title}</Link>
      </nav>
    </Page>
  );
}
