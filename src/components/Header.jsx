import { useState, useEffect } from "react";
import {
  Sparkles,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Megaphone,
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Colleges", href: "#", active: true },
  { label: "Courses", href: "#" },
  { label: "Institutes", href: "#" },
  { label: "Exams", href: "#" },
  { label: "Blogs", href: "#" },
  { label: "Study Abroad", href: "#" },
  { label: "Scholarships", href: "#" },
  { label: "Smart Counselor", href: "#" },
];

export default function Header() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 glass-nav">
      <div className="container mx-auto flex h-[4.5rem] items-center justify-between gap-4 px-4 py-3">
        <a href="#" className="flex items-center gap-3">
          <img src="/image.png" alt="CollegeBlink" className="h-12 w-auto" />
        </a>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-white/60 p-1 shadow-sm backdrop-blur-xl dark:bg-gray-800/60 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                link.active
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-indigo-500/70 hover:text-white dark:text-gray-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden h-9 items-center gap-2 rounded-full border border-indigo-500/30 bg-transparent px-4 text-[11px] font-bold text-indigo-500 transition-all hover:bg-indigo-500 hover:text-white active:scale-[0.98] md:flex">
            <Sparkles className="h-3 w-3" />
            <span>Need Counselling</span>
          </button>

          <a
            href="#"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-white/75 text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-gray-100 md:flex dark:bg-gray-800/75 dark:text-gray-300"
          >
            <Search className="h-4 w-4" />
          </a>

          <button
            onClick={() => setDark(!dark)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-white/75 text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-gray-100 dark:bg-gray-800/75 dark:text-gray-300"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-white/60 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:bg-gray-100 dark:bg-gray-800/60"
          >
            <Megaphone className="h-5 w-5 text-indigo-500" />
            <span className="absolute right-2.5 top-2.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </span>
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-white/75 text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-gray-100 md:hidden dark:bg-gray-800/75 dark:text-gray-300"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border/70 bg-white px-4 py-4 shadow-lg md:hidden dark:bg-gray-900">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  link.active
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button className="mt-2 flex items-center gap-2 rounded-full border border-indigo-500/30 px-4 py-2 text-sm font-bold text-indigo-500 transition-all hover:bg-indigo-500 hover:text-white">
              <Sparkles className="h-3 w-3" />
              Need Counselling
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
