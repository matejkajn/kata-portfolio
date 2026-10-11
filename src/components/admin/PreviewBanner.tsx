/** Warns that the admin is open in the local no-login preview. */
export function PreviewBanner() {
  return (
    <div className="mb-6 rounded-xl border border-accent bg-accent/15 px-4 py-3 text-sm text-ink">
      <strong>Náhled bez přihlášení</strong> (<code>ADMIN_AUTH_BYPASS</code>).
      Vše si můžete prohlédnout, ale ukládání a nahrávání obrázků nefunguje —
      databáze zápis bez přihlášení odmítne.
    </div>
  );
}
