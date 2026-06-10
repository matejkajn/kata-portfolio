import type { ProcessStep } from "@/types";

/** The four steps of the creative collaboration process. */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    label: "Analýza",
    description:
      "Nejdříve se chci dozvědět co nejvíc o Vás, Vašem projektu a Vaší konkurenci. Připravím si otázky a společně si na vše odpovíme, ať vím, jakým směrem se vydat a co má výsledná práce splňovat.",
  },
  {
    label: "Návrh",
    description:
      "Na základě předešlého kroku navrhnu moodboard, vizuální směr, kterým se budeme ubírat. Ukážeme si, jak se daný směr vymezuje oproti konkurenci. Ten si spolu schválíme.",
  },
  {
    label: "Realizace",
    description:
      "Jakmile víme, kudy jdeme, pustím se do tvorby. Pracuji postupně a v průběhu Vás zapojuji, aby výsledek odpovídal Vašim představám a ne jen mým.",
  },
  {
    label: "Předání",
    description:
      "Finální soubory dostanete přehledně zabalené a připravené k použití. Vysvětlím Vám, co jste dostali a jak s materiály pracovat, takže nezůstanete na nic sami.",
  },
];
