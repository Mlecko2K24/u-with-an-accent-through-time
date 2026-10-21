import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/site";
import { CONTACT } from "@/data/works";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Elvis Milo Federico" },
      { name: "description", content: "Contact Elvis Milo Federico for projects, 3D consultation, photography and video editing." },
      { property: "og:title", content: "Contact — Elvis Milo Federico" },
      { property: "og:description", content: "Contact Elvis Milo Federico. Milan / Antwerpen." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Page>
      <div className="site-grid gap-y-10">
        <h1 className="col-span-12 md:col-span-4 text-display">Contact</h1>
        <div className="col-span-12 md:col-start-6 md:col-span-6 text-body space-y-2">
          <p>You can book me for a 3D consultation and 3D related jobs, photography and video editing :)</p>
          <p className="pt-4"><a className="link text-nav" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p><a className="link" href={CONTACT.instagram} target="_blank" rel="noreferrer">Instagram — {CONTACT.instagramHandle}</a></p>
          <p className="text-muted-foreground pt-4">{CONTACT.base}</p>
        </div>
      </div>
    </Page>
  );
}
