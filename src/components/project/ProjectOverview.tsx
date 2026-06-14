interface ProjectOverviewProps {
  /** Comma-separated work tags, e.g. "logotvorba". */
  tags: string;
  /** Case-study body text; paragraphs are separated by blank lines. */
  description: string | null;
}

/** Split a description into paragraphs on blank lines, dropping empties. */
function toParagraphs(description: string | null): string[] {
  if (!description) return [];
  return description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

/**
 * "O Projektu" — the intro block: work tags and section label on the left,
 * the project narrative on the right.
 */
export function ProjectOverview({ tags, description }: ProjectOverviewProps) {
  const paragraphs = toParagraphs(description);

  return (
    <div className="grid gap-6 md:grid-cols-[2fr_3fr] md:gap-12">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted">{tags}</p>
        <h2 className="text-2xl font-bold tracking-tight text-ink">O Projektu</h2>
      </div>

      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
