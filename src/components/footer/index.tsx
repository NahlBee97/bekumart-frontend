import { Snowflake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-white/70">
          <Snowflake className="w-4 h-4 text-frost" />
          <span className="font-display font-semibold text-white">
            BekuMart
          </span>
        </div>
        <p className="text-white/40 text-xs">
          &copy; {new Date().getFullYear()} Nahalil Muchtar. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
