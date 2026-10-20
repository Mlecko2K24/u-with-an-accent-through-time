// Single source of truth for works. Add a new object to add a new project page.
// Fields marked PLACEHOLDER are not factual and must be replaced by the artist.

const cargo = (id: string, w = 1500) => `https://freight.cargo.site/w/${w}/i/${id}`;

export const IMG = {
  lanterns: cargo("F3016490541577233835383448088451/Slideshowwebsite.jpg"),
  s23: cargo("O3016486931106696752655167598467/Slideshowwebsite-23.jpg"),
  s22: cargo("G3016486931088250008581458046851/Slideshowwebsite-22.jpg"),
  s21: cargo("B3016486931069803264507748495235/Slideshowwebsite-21.jpg"),
  s7: cargo("R3016486930811548847475814772611/Slideshowwebsite-7.jpg"),
  s1: cargo("E3016486930700868383033557462915/Slideshowwebsite.jpg"),
  s15: cargo("R3016486930959122800065491185539/Slideshowwebsite-15.jpg"),
  logo: "https://freight.cargo.site/w/1000/i/T2186517296645342747567020781443/elvisfedericoV2.png",
};

export type Block =
  | { type: "full"; src: string; caption?: string }
  | { type: "pair"; items: { src: string; caption?: string }[] }
  | { type: "offset"; src: string; side: "left" | "right"; caption?: string }
  | { type: "text"; body: string; placeholder?: boolean }
  | { type: "vimeo"; id: string; title: string };

export type Work = {
  slug: string;
  title: string;
  year: number;
  location?: string;
  medium?: string;
  kind?: string;
  cover?: string;
  summary: string;
  placeholder: boolean; // true = description/metadata not yet supplied
  blocks: Block[];
};

const TBC = "Description to be supplied by the artist.";

export const works: Work[] = [
  {
    slug: "meteora",
    title: "Meteora",
    year: 2026,
    cover: IMG.s22,
    summary: TBC,
    placeholder: true,
    blocks: [
      { type: "full", src: IMG.s22, caption: "Image from Cargo slideshow · assignment to confirm" },
      { type: "text", body: TBC, placeholder: true },
      { type: "pair", items: [{ src: IMG.s23 }, { src: IMG.s21 }] },
      { type: "offset", src: IMG.s7, side: "right", caption: "Image assignment to confirm" },
    ],
  },
  {
    slug: "novotronic-w526",
    title: "Novotronic W526 Magnetic-Waterflow control system",
    year: 2026,
    cover: IMG.s23,
    summary: TBC,
    placeholder: true,
    blocks: [{ type: "offset", src: IMG.s23, side: "left" }, { type: "text", body: TBC, placeholder: true }],
  },
  {
    slug: "euroblock",
    title: "EuroBlock",
    year: 2026,
    cover: IMG.s21,
    summary: TBC,
    placeholder: true,
    blocks: [{ type: "full", src: IMG.s21 }, { type: "text", body: TBC, placeholder: true }],
  },
  {
    slug: "light-organism-vessel-iii",
    title: "Light Organism vessel III",
    year: 2026,
    cover: IMG.lanterns,
    summary: TBC,
    placeholder: true,
    blocks: [{ type: "offset", src: IMG.lanterns, side: "right" }, { type: "text", body: TBC, placeholder: true }],
  },
  {
    slug: "oasis",
    title: "Oasis",
    year: 2026,
    cover: IMG.s7,
    summary: TBC,
    placeholder: true,
    blocks: [{ type: "full", src: IMG.s7 }, { type: "text", body: TBC, placeholder: true }],
  },
  {
    slug: "light-organism-vessel-ii",
    title: "Light Organism vessel II",
    year: 2026,
    cover: IMG.s1,
    summary: TBC,
    placeholder: true,
    blocks: [{ type: "offset", src: IMG.s1, side: "left" }, { type: "text", body: TBC, placeholder: true }],
  },
  {
    slug: "pokemon-27bc",
    title: "Pokemon 27B.C.",
    year: 2026,
    cover: IMG.s15,
    summary: TBC,
    placeholder: true,
    blocks: [{ type: "full", src: IMG.s15 }, { type: "text", body: TBC, placeholder: true }],
  },
  {
    slug: "24-7",
    title: "24/7",
    year: 2025,
    kind: "Moving image",
    summary: "Film. Further details to be supplied.",
    placeholder: true,
    blocks: [{ type: "vimeo", id: "1051098125", title: "24/7 by Elvis Milo Federico" }],
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);

export const CONTACT = {
  email: "elvfedmilo@gmail.com", // TO CONFIRM: Cargo link pointed to elvisfederico@icloud.com
  phone: "+39 345 399 3106",
  base: "Milan / Antwerpen",
  vimeo: "https://vimeo.com/1051098125",
};
