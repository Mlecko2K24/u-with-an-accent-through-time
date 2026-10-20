import { createFileRoute } from "@tanstack/react-router";
import { Page, Placeholder } from "@/components/site";

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
        <h1 className="col-span-12 md:col-span-4 text-display">About me ;)</h1>
        <div className="col-span-12 md:col-start-6 md:col-span-6 text-body space-y-6">
          <p><Placeholder>draft — replace with your text</Placeholder></p>
          <p>
            Elvis Milo Federico is an artist working with site-specific art, installation, sculpture, photography,
            moving image, material experimentation and digital technologies. His practice looks at the relationships
            between space, infrastructure, technology, ecology, political power and human intervention in landscapes.
          </p>
          <p>Based between Milan and Antwerpen.</p>
          <p className="text-muted-foreground">CV on request.</p>
        </div>
      </div>
    </Page>
  );
}
