import type { Project } from "@/types";

/**
 * Portfolio projects. The homepage shows the first four; the full portfolio
 * page lists them all. Image covers are placeholders for Iteration 1 and will
 * be served from Supabase storage later.
 */
export const PROJECTS: Project[] = [
  {
    slug: "fusionfitness",
    title: "Fusion Fitness",
    tags: "rebranding",
    imageColor: "#1b1d22",
  },
  {
    slug: "tanecliberec",
    title: "Tanec Liberec",
    tags: "logotvorba, vizuální identita",
    imageColor: "#e8311c",
  },
  {
    slug: "roberthajek",
    title: "Robert Hájek",
    tags: "logotvorba, rebranding, vizuální identita",
    imageColor: "#3a4256",
  },
  {
    slug: "latkyrudolf",
    title: "Látky Rudolf",
    tags: "logotvorba, rebranding, vizuální identita",
    imageColor: "#5a4632",
  },
  {
    slug: "praguepride",
    title: "Prague Pride",
    tags: "brandsystém",
    imageColor: "#23262b",
  },
  {
    slug: "gabrielamladkova",
    title: "Gabriela Mládková",
    tags: "logotvorba",
    imageColor: "#cfd3d8",
  },
  {
    slug: "vidix",
    title: "Vidix",
    tags: "propagační materiály",
    imageColor: "#2b2f36",
  },
  {
    slug: "activeestatesro",
    title: "Active Estate",
    tags: "logotvorba",
    imageColor: "#1f2228",
  },
];

/** Projects featured on the homepage portfolio grid. */
export const FEATURED_PROJECTS: Project[] = PROJECTS.slice(0, 4);
