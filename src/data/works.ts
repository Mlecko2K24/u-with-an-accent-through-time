// Single source of truth for works. Add a new object to add a new project page.
// Fields marked PLACEHOLDER are not factual and must be replaced by the artist.

// Images live on the CDN; each src/assets/**.asset.json pointer holds its URL.
const pointers = import.meta.glob("../assets/**/*.asset.json", {
  eager: true,
  import: "default",
}) as Record<string, { url: string }>;

const byName = new Map(
  Object.entries(pointers).map(([path, p]) => [
    path.split("/").pop()!.replace(/\.asset\.json$/, ""),
    p.url,
  ]),
);

const u = (name: string) => {
  const url = byName.get(name);
  if (!url) throw new Error(`Missing asset: ${name}`);
  return url;
};

export const IMG = {
  logo: u("elvisfederico-logo.png"),
  cutout: u("flyingcutout-1.png"),
  landscape: u("bottom-landscape3d.png"),
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
  year: number; // 0 = year to be confirmed
  location?: string;
  medium?: string;
  kind?: string;
  cover?: string;
  summary: string;
  placeholder: boolean; // true = description/metadata not yet supplied
  blocks: Block[];
};

// Rhythm: full-width image, then pairs, last one offset.
const layout = (imgs: string[]): Block[] => {
  const blocks: Block[] = [];
  let i = 0;
  while (i < imgs.length) {
    if (i === 0) {
      blocks.push({ type: "full", src: imgs[i]! });
      i++;
    } else if (i + 1 < imgs.length) {
      blocks.push({ type: "pair", items: [{ src: imgs[i]! }, { src: imgs[i + 1]! }] });
      i += 2;
    } else {
      blocks.push({ type: "offset", src: imgs[i]!, side: i % 4 === 1 ? "left" : "right" });
      i++;
    }
  }
  return blocks;
};

const page = (
  cover: string | undefined,
  body: string,
  gallery: string[],
  bodyPlaceholder = false,
): Block[] => [
  ...(cover ? [{ type: "full", src: cover } as Block] : []),
  { type: "text", body, placeholder: bodyPlaceholder },
  ...layout(gallery),
];

const LSO_BODY =
  "The lanterns I make explore the behaviour of being light-seeking organisms. Inspired by the ways living beings orient themselves towards light, the work transforms this natural impulse into an interaction between bodies and their environment. The lanterns become artificial sources of attraction, blurring the boundaries between biological instinct and technological response.";

export const works: Work[] = [
  {
    slug: "meteora",
    title: "NWA 868-A",
    year: 2026,
    kind: "Permanent site-specific installation",
    location: "New Detention Centre, Antwerp, Belgium",
    medium: "meteorite, aluminium plates, bolts",
    cover: u("meteora-01-cover.jpg"),
    summary:
      "A meteorite rests on the ceiling of a detention centre in Antwerp — an object that travelled through space for millions of years, placed where the sky is the last open view.",
    placeholder: false,
    blocks: page(
      u("meteora-01-cover.jpg"),
      `After visiting the site, I was struck by how dystopian the idea of confining a human being, or any living being, within a defined space can be, and by how naturalised this act of confinement has become.

I began thinking about what cannot be taken away from a person in terms of freedom. The first thing that came to mind was imagination, and particularly the kind of imagination that can emerge when looking through a window at the sky or beyond the limits of the space in which we are confined.

The new detention centre has been designed with an awareness of the psychological impact of confinement. The cells are positioned so that the surrounding huge walls have as little visual impact as possible, allowing the view beyond the building to remain open.

For me, imagination can be stimulated by many things, but looking at the sky, the stars and the moon can open an infinite journey of thought. This led me to introduce a meteorite: an object that has travelled through space for millions, perhaps billions, of years before eventually reaching Earth, where it came to rest, for now on the ceiling of a detention centre in Antwerp.

Commissioned within New Detention Centre Antwerp, Regie der Gebouwen / Régie des Bâtiments.
Project partners: Hortus Conclusus, Jan De Nul Group, EEG.
With thanks to Kris van't Hof, Ramon Huijbrechts, @royalacademyantwerp, @insitu_royalacademyantwerp, @stad_antwerpen, @jandenulgroup, @starstonebe`,
      [
        u("meteora-02.jpg"), u("meteora-03.jpg"), u("meteora-04.jpg"), u("meteora-05.jpg"),
        u("meteora-06.jpg"), u("meteora-07-detail.jpg"), u("meteora-08-detail.jpg"),
        u("meteora-09-detail.jpg"), u("meteora-10.jpg"),
      ],
    ),
  },
  {
    slug: "europe-is-heavy-to-move",
    title: "Europe is heavy to move",
    year: 2026,
    medium: "500 kg of concrete, Euro pallet",
    location: "Royal Academy of Fine Arts Antwerp",
    cover: u("euroblock-cover.jpg"),
    summary:
      "A 500 kg concrete block chiselled with the European flag, moved across the exhibition room with the help of visitors.",
    placeholder: false,
    blocks: page(
      u("euroblock-cover.jpg"),
      `Exhibited in "moving" curated by Leon Vranken at the Royal Academy of Fine Arts Antwerp. The artists were invited to create artwork that moves or suggests movement. I decided to use a previously made block of 500 kg of concrete and chisel on it the European flag. During the expo I invited visitors to help me move the block across the room.`,
      [u("euroblock-2.jpg"), u("euroblock-3.jpg"), u("euroblock-4.jpg"), u("euroblock-5.jpg")],
    ),
  },
  {
    slug: "lowpolyroots",
    title: "Lowpolyroots",
    year: 2025,
    medium: "aluminium",
    location: "Stadswaag Square, Antwerp",
    cover: u("lowpolyroots-2-cover.jpg"),
    summary: "A 3D-sculpted intervention for the artistic integration in public space in Stadswaag Square, Antwerp.",
    placeholder: false,
    blocks: page(
      u("lowpolyroots-2-cover.jpg"),
      `A 3D-sculpted intervention I developed as part of my collaboration with @_subinson_ for the artistic integration in public space in Stadswaag Square, Antwerp.

Endless thanks to @lucia_mrakovcic, Nico Dockx, and @mathias.mu for their generous guidance, insight, and support throughout the process.

In collaboration with @research_royalacademyantwerp @royalacademyantwerp @stadsform @ontwerpwetenschappen. With the support of @districtantwerpen`,
      [
        u("lowpolyroots.jpg"), u("lowpolyroots-3.jpg"), u("lowpolyroots-4-detail.jpg"),
        u("lowpolyroots-5.jpg"), u("lowpolyroots-6.jpg"), u("lowpolyroots-7.jpg"),
      ],
    ),
  },
  {
    slug: "light-seeking-organism-v3",
    title: "Light Seeking Organism V3",
    year: 2025,
    medium: "petg, wood, fimo",
    cover: u("lso3-6-cover.jpg"),
    summary: LSO_BODY,
    placeholder: false,
    blocks: page(u("lso3-6-cover.jpg"), LSO_BODY, [
      u("lso3.jpg"), u("lso3-2.jpg"), u("lso3-3.jpg"), u("lso3-4.jpg"), u("lso3-5.jpg"), u("lso3-7.jpg"),
    ]),
  },
  {
    slug: "blur-yourself-away",
    title: "blur yourself away",
    year: 2025,
    medium: "clear resin",
    cover: u("blur.jpg"),
    summary: "Clear resin. In collaboration with Jade Sterckx.",
    placeholder: false,
    blocks: page(u("blur.jpg"), "In collaboration with Jade Sterckx.", [
      u("blur-2.jpg"), u("blur-3.jpg"), u("blur-4.jpg"), u("blur-5.jpg"),
      u("blur-6.jpg"), u("blur-7.jpg"), u("blur-8.jpg"),
    ]),
  },
  {
    slug: "mlekoland",
    title: "Mlekoland",
    year: 2025,
    kind: "Moving image",
    medium: "3d animation, 3d scan",
    summary:
      "An ongoing collaborative project of 3D scans, objects and texts — a growing collection of personal fragments in a shared space.",
    placeholder: false,
    blocks: [
      { type: "vimeo", id: "1237982762", title: "Mlekoland by Elvis Milo Federico" },
      {
        type: "text",
        body: "Mlekoland is an ongoing collaborative project exploring the ways we represent ourselves and the traces we leave behind. It invites participants to contribute a 3D scan of themselves, objects or artefacts they have made, and a text about something they wish to share. These contributions form a growing collection of personal fragments, bringing together bodies, objects and stories in a shared space.",
      },
    ],
  },
  {
    slug: "light-seeking-organism-v1",
    title: "Light Seeking Organism V1",
    year: 2024,
    medium: "petg, clar resin, plexiglass",
    cover: u("lso1-cover.jpg"),
    summary: LSO_BODY,
    placeholder: false,
    blocks: page(
      u("lso1-cover.jpg"),
      `${LSO_BODY}\n\nExhibited in @09h30_05h30 with @mathias.mu`,
      [u("lso1-2.jpg"), u("lso1-3.jpg"), u("lso1-4.jpg"), u("lso1-5.jpg"), u("lso1-6.jpg"), u("lso1-7.jpg")],
    ),
  },
  {
    slug: "light-seeking-organism-v2",
    title: "Light Seeking Organism V2",
    year: 2024,
    medium: "petg, clar resin, parallax filter",
    cover: u("lso2-2-cover.jpg"),
    summary: LSO_BODY,
    placeholder: false,
    blocks: page(u("lso2-2-cover.jpg"), LSO_BODY, [
      u("lso2.jpg"), u("lso2-3.jpg"), u("lso2-4.jpg"), u("lso2-5.jpg"), u("lso2-6.jpg"),
    ]),
  },
  {
    slug: "deadly-directions",
    title: "Deadly directions",
    year: 2024,
    medium: "wood, Europallet",
    cover: u("deadly-2-cover.jpg"),
    summary: "Directions towards weapons of mass destruction.",
    placeholder: false,
    blocks: page(
      u("deadly-2-cover.jpg"),
      `Directions towards weapons of mass destruction.

Volkel Air Base, Netherlands — 51.6569° N, 5.7051° E
Aviano Air Base, Italy — 46.0319° N, 12.5966° E
Incirlik Air Base, Turkey — 37.0023° N, 35.4258° E
Kleine Brogel Air Base, Belgium — 51.1683° N, 5.4708° E
Büchel Air Base, Germany — 50.1736° N, 7.0633° E
Ghedi Air Base, Italy — 45.4025° N, 10.2766° E`,
      [u("deadly.jpg"), u("deadly-3.jpg"), u("deadly-4.jpg")],
    ),
  },
  {
    slug: "was-there-a-field",
    title: "was there a field? a forest? or was it just a dead land",
    year: 2024,
    medium: "Rubber, tripod, wood, paper",
    location: "Lillo, Belgium",
    cover: u("field-6-cover.jpg"),
    summary: "Intervention in Lillo, Belgium.",
    placeholder: false,
    blocks: page(u("field-6-cover.jpg"), "Intervention in Lillo, Belgium.", [
      u("field.jpg"), u("field-2.jpg"), u("field-3.jpg"), u("field-4.jpg"), u("field-5.jpg"),
    ]),
  },
  {
    slug: "im-working-as-always",
    title: "I'm Working as always",
    year: 2024,
    kind: "Moving image",
    medium: "3d animation, 3d scan",
    summary: "You can find me in my atelier 24/7.",
    placeholder: false,
    blocks: [
      { type: "vimeo", id: "1051098125", title: "I'm Working as always by Elvis Milo Federico" },
      { type: "text", body: "You can find me in my atelier 24/7" },
    ],
  },
  {
    slug: "parade-mapper",
    title: "Parade Mapper",
    year: 0, // PLACEHOLDER: year to be confirmed by the artist
    cover: u("parade-13-cover.jpg"),
    summary: "Description to be supplied by the artist.",
    placeholder: true,
    blocks: page(
      u("parade-13-cover.jpg"),
      "Description to be supplied by the artist.",
      [
        u("parade.jpg"), u("parade-2.jpg"), u("parade-3.jpg"), u("parade-4.jpg"), u("parade-5.jpg"),
        u("parade-6.jpg"), u("parade-7.jpg"), u("parade-8.jpg"), u("parade-9.jpg"), u("parade-10.jpg"),
        u("parade-11.jpg"), u("parade-12.jpg"), u("parade-14.jpg"),
      ],
      true,
    ),
  },
  {
    slug: "three-materials",
    title: "three materials — wood, paper and textile",
    year: 2023,
    medium: "wood, paper, textile",
    cover: u("tm-wood-12-cover.jpg"),
    summary:
      "Material research that misuses wood, paper and textile until unfamiliar properties and forms emerge.",
    placeholder: false,
    blocks: page(
      u("tm-wood-12-cover.jpg"),
      `This material research investigates wood, paper and textile through unconventional processes of transformation. By misusing familiar materials and pushing them beyond their intended functions, the project explores how unexpected physical properties and forms can emerge from simple experiments.

Wood sawdust collected from the school's wood workshop was mixed with bio-based glue to create a malleable paste. Paper waste from drawing classes was gathered inside a pillowcase and washed at 90°C, transforming discarded sheets into compact, stone-like forms. Finally, a mattress topper was exposed to the heat of a tumble dryer, causing the material to melt and deform into irregular, organic structures.

Through these processes, everyday materials become unfamiliar. The work focuses on experimentation, material behaviour and the possibilities that emerge when established methods of use are deliberately disrupted.`,
      [
        u("tm-wood.jpg"), u("tm-textile-2.jpg"), u("tm-paper-3.jpg"), u("tm-paper-4-cover.jpg"),
        u("tm-textile-6-cover.jpg"), u("tm-wood-7.jpg"), u("tm-paper-8.jpg"), u("tm-paper-9.jpg"),
        u("tm-textile-10.jpg"), u("tm-wood-11.jpg"), u("tm-wood-13.jpg"),
      ],
    ),
  },
  {
    slug: "dry-wells",
    title: "Dry wells will never be wet",
    year: 2023,
    location: "Hydra, Greece — 37.341345, 23.483378",
    cover: u("drywells-2-cover.jpg"),
    summary:
      "Circular rock formations evoking natural springs, arranged on a mountainside in Hydra during an In Situ residency.",
    placeholder: false,
    blocks: page(
      u("drywells-2-cover.jpg"),
      `Developed during an In Situ residency on the island of Hydra, Greece, this site-specific intervention explores water as both a natural resource and a mythical presence. Responding to the island's mythology of a water spring, I worked directly with the mountain landscape, rearranging locally found rocks into circular formations that evoke the shape of natural springs, reminiscent of the thermal pools of Saturnia in Italy.

Created in a landscape increasingly threatened by wildfires and extreme drought, the work reflects on the tension between the presence of water in collective memory and its scarcity in the present. Through a minimal intervention using only materials found on site, the installation traces an imagined relationship between geology, mythology and environmental change. Although the work was never intended to be permanent, its formations remain visible through satellite imagery.`,
      [
        u("drywells.jpg"), u("drywells-3.jpg"), u("drywells-4.jpg"), u("drywells-5.jpg"),
        u("drywells-6.jpg"), u("drywells-7.jpg"), u("drywells-8.jpg"), u("drywells-9.jpg"),
      ],
    ),
  },
  {
    slug: "unvote",
    title: "Unvote",
    year: 2022,
    medium: "Plexiglass, paper, document shredder, pvc pipes, pvc",
    cover: u("unvote.jpg"),
    summary: "2022-2027 will be dak years for my country.",
    placeholder: false,
    blocks: page(u("unvote.jpg"), "2022-2027 will be dak years for my country.", [
      u("unvote-2.jpg"), u("unvote-3.jpg"), u("unvote-4.jpg"), u("unvote-5.jpg"),
      u("unvote-6.jpg"), u("unvote-7.jpg"), u("unvote-8.jpg"), u("unvote-9.jpg"),
    ]),
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);

export const ABOUT =
  `Elvis Milo Federico is an Italian-Polish artist based in Antwerp, Belgium, currently pursuing his Master in fine arts at the Royal Academy of Fine Arts Antwerp. Working across installation, sculpture, moving image and digital technologies, his practice explores the relationships between human activity, technological systems and the environments we inhabit.

Working through site-specific interventions, material research and experimental processes, he investigates how infrastructures, political structures and natural phenomena shape our perception of the world. His work often begins with the observation of a place, a material or a system, developing into situations that question the boundaries between the natural and the artificial, the visible and the hidden, and the real and the constructed.`;

export const CONTACT = {
  email: "elvfedmilo@gmail.com",
  instagram: "https://www.instagram.com/elvismilofederico/",
  instagramHandle: "@elvismilofederico",
  base: "Milan — Antwerp — Warsaw",
};

export const RUNNING_VIDEO = { id: "1051098125", title: "I'm Working as always by Elvis Milo Federico" };
