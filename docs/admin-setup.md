# Administration setup (Google login, two accounts)

The admin lives at `/admin`. Only Google accounts on the allowlist can edit content.
Access is restricted in three independent layers:

| Layer | Where | Effect |
|---|---|---|
| Google OAuth "Testing" mode + test users | Google Cloud Console | Google itself refuses to sign in anyone else |
| `hook_restrict_signup` Auth hook (optional) | Supabase → Auth → Hooks | Supabase refuses to create a user for any other e-mail |
| `admin_users` table + RLS `is_admin()` | Supabase database | Even a signed-in stranger can't read the admin UI or write anything |

The last layer is the one that matters for security; the first two just keep strangers out earlier.

---

## 1. Run the database migration

1. Open `supabase/migrations/0002_admin.sql` and **replace the two placeholder e-mails**
   (`first.admin@gmail.com`, `second.admin@gmail.com`) with the two real Google accounts.
2. Supabase Dashboard → **SQL Editor** → *New query* → paste the whole file → **Run**.

It is idempotent (safe to run again). It creates `admin_users`, `site_settings`,
`process_steps`, `testimonials` (seeded with the current copy), the RLS write policies
and the storage upload policies for the `project-images` bucket.

To change the admins later:

```sql
insert into public.admin_users (email) values ('new@gmail.com');
delete from public.admin_users where email = 'old@gmail.com';
```

## 2. Create the Google OAuth client

In [Google Cloud Console](https://console.cloud.google.com/):

1. Create (or pick) a project.
2. **APIs & Services → OAuth consent screen** (a.k.a. *Google Auth Platform*):
   - User type: **External**.
   - App name, support e-mail, developer e-mail — anything sensible.
   - Scopes: the defaults (`email`, `profile`, `openid`) are enough.
   - **Audience / Test users → add the two Google accounts.**
   - Leave the publishing status on **Testing**. In Testing mode only listed test
     users can sign in — exactly the two-account restriction we want.
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - Application type: **Web application**.
   - **Authorized JavaScript origins**: `http://localhost:3000` and your production
     URL (e.g. `https://katerinahrselova.cz`).
   - **Authorized redirect URIs**:
     `https://przsceqrfwpiabdrvwmr.supabase.co/auth/v1/callback`
     (shown also in Supabase on the Google provider page — copy it from there).
   - Save and copy the **Client ID** and **Client secret**.

## 3. Enable Google in Supabase

1. Dashboard → **Authentication → Sign In / Providers → Google** → enable.
2. Paste the Client ID and Client secret → **Save**.
3. Dashboard → **Authentication → URL Configuration**:
   - **Site URL**: your production URL.
   - **Redirect URLs** — add:
     - `http://localhost:3000/auth/callback`
     - `https://<your-production-domain>/auth/callback`

## 4. (Optional) Block sign-up of anyone else

Dashboard → **Authentication → Hooks → Before User Created** → *Postgres function* →
`public.hook_restrict_signup` → enable. Any other Google account then fails with
"This account is not allowed…" and no user row is ever created.

## 5. Try it

```bash
npm run dev
```

Open <http://localhost:3000/admin> → *Přihlásit se přes Google* → pick one of the two
accounts. You should land on **Nastavení webu**. A different account ends on
"Přístup odepřen" (or is blocked by Google / the hook before that).

## How content flows

- Public pages are static. Every admin save calls `revalidatePath("/", "layout")`, so
  the next visitor gets a freshly rendered page.
- Images are uploaded straight from the browser to the `project-images` bucket
  (`site/…`, `references/…`, `projects/<slug>/…`). Removing an image from a project
  only removes the database row; the file stays in storage.
- If the new tables don't exist yet, the site falls back to the defaults in
  `src/lib/content/`, so it keeps working before the migration is run.

## Preview without login (local only)

To just look at the admin before Google login is configured, add to `.env.local`
(or `.env`):

```bash
ADMIN_AUTH_BYPASS=true
```

and restart `npm run dev`. `/admin` opens without signing in and shows a yellow
"Náhled bez přihlášení" banner. Saving and uploads fail on purpose — the database
only accepts writes from a signed-in admin. The flag is ignored by `next build` /
`next start`, so it can never open the admin in production.
