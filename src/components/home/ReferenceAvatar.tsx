import Image from "next/image";

interface ReferenceAvatarProps {
  name: string;
  photoUrl?: string;
}

/** First letters of the first and last name, e.g. "Ondřej Filip" → "OF". */
function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/** Square portrait of the client, or their initials when no photo is set. */
export function ReferenceAvatar({ name, photoUrl }: ReferenceAvatarProps) {
  return (
    <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-white/10 sm:size-28">
      {photoUrl ? (
        <Image src={photoUrl} alt={name} fill sizes="112px" className="object-cover" />
      ) : (
        <span
          aria-hidden
          className="flex size-full items-center justify-center text-2xl font-semibold text-white/80"
        >
          {initialsOf(name)}
        </span>
      )}
    </div>
  );
}
