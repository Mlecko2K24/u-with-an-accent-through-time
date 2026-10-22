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
  return (
    <Page>
      <article>
        <header className="site-grid mb-16 md:mb-24">
          <h1 className="col-span-12 md:col-start-2 md:col-span-10 text-display">{work.title}</h1>
          {work.placeholder && <p className="col-span-12 md:col-start-2 mt-3"><Placeholder>information incomplete</Placeholder></p>}
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
