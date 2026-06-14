import { ButtonLink } from "@/components/ui/Button";

/** Landing hero with the headline, intro copy and a portfolio CTA. */
export function HeroSection() {
  return (
    <section className="px-6 pb-24 pt-36 sm:px-8 md:pb-32 md:pt-44">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Kreativní design, který{" "}
          <span className="text-accent">promlouvá</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Vytvářím vizuální identity, které zaujmou a vyprávějí příběh vaší
          firmy. Každý projekt je pro mě jedinečnou příležitostí ke kreativnímu
          vyjádření.
        </p>
        <ButtonLink href="#portfolio" variant="outline" className="mt-2">
          Portfolio
        </ButtonLink>
      </div>
    </section>
  );
}
