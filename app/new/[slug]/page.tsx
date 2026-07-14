import { notFound } from "next/navigation";

// Route retired — the site lives at the root. This file only exists
// because it can't be deleted without shell access; remove app/new/
// page files (keeping the shared modules) when possible.
export default function Retired() {
  notFound();
}
