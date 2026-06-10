import { Section } from "@/components/layout/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

/** "O mně" — introduction and portrait. */
export function AboutSection() {
  return (
    <Section
      id="o-mne"
      innerClassName="grid items-center gap-12 md:grid-cols-2"
    >
      <div className="flex flex-col gap-5">
        <span className="text-sm font-medium text-muted">O mně</span>
        <h2 className="text-3xl font-bold leading-snug tracking-tight text-ink sm:text-4xl">
          Ahoj, jsem grafická designérka na volné noze z Hradce Králové
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Jmenuji se Kateřina a jsem grafická designérka zaměřující se na
          vizuální identitu, branding a grafické materiály pro tisk i online
          prostředí. Už od roku 2020 se věnuji práci s klienty od návrhu log,
          vizitek a plakátů až po rozsáhlejší katalogy a firemní prezentace.
          Nejvíc mě naplňuje, když můžu vytvořit kompletní vizuální koncept od
          prvního nápadu až po finální realizaci.
        </p>
        <p className="text-base leading-relaxed text-muted">
          Moje práce kombinuje kreativitu s důrazem na detail a funkčnost.
          Věřím, že kvalitní design musí být nejen esteticky zajímavý, ale
          především srozumitelný a použitelný. Díky zkušenostem z praxe i studia
          v Portugalsku mám širší pohled na vizuální tvorbu – od tradičních
          technik až po moderní digitální nástroje.
        </p>
      </div>

      <ImagePlaceholder
        label="Portrét"
        color="#cdd2d8"
        className="aspect-[4/5] w-full rounded-2xl"
      />
    </Section>
  );
}
