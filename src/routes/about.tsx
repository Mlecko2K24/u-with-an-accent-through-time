import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site";
import { ABOUT } from "@/data/works";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Elvis Milo Federico" },
      { name: "description", content: "Biography of Elvis Milo Federico, artist based between Milan and Antwerp." },
      { property: "og:title", content: "About — Elvis Milo Federico" },
      { property: "og:description", content: "Biography of Elvis Milo Federico, artist based between Milan and Antwerp." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <Page>
      <div className="site-grid gap-y-10">
        <h1 className="col-span-12 md:col-start-2 md:col-span-10 text-display">About me ;)</h1>
        <div className="col-span-12 md:col-start-2 md:col-span-10 text-lg md:text-2xl leading-snug space-y-8 max-w-[56rem]">
          {ABOUT.split("\n\n").map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="text-muted-foreground text-body">CV on request.</p>
        </div>
      </div>
    </Page>
  );
}
