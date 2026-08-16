import { cacheLife } from "next/cache";

// Cache Components treats `new Date()` as non-deterministic and requires it be read inside
// a cache/dynamic boundary — this is a purely mechanical fix (same year, no content change).
export default async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
