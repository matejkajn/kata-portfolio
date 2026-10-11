import { redirect } from "next/navigation";

/** The admin home is the site settings screen. */
export default function AdminHomePage() {
  redirect("/admin/settings");
}
