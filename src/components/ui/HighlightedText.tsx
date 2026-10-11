import { Fragment } from "react";

interface HighlightedTextProps {
  /** Text where `*word*` is highlighted and `\n` breaks the line. */
  text: string;
  highlightClassName?: string;
}

/**
 * Renders admin-editable headings with light markup: segments wrapped in
 * asterisks get the accent colour, newlines become `<br />`.
 */
export function HighlightedText({ text, highlightClassName = "text-accent" }: HighlightedTextProps) {
  const lines = text.split("\n");

  return lines.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/(\*[^*]+\*)/).map((part, partIndex) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <span key={partIndex} className={highlightClassName}>
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </Fragment>
  ));
}
