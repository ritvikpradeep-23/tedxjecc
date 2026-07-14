import { useEffect, useState } from "react";
import { navLinks } from "../data/siteData";
import Button from "./Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);

      const activationLine = window.innerHeight * 0.4;
      let current = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) {
          current = `#${section.id}`;
        }
      }
      setActiveHref(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-tedx-black/95 backdrop-blur-md shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-8 py-4">
        <a href="#hero" className="font-display text-2xl font-bold tracking-tight text-white">
          TED<span className="text-tedx-red">x</span>
          <span className="text-white">JEC</span>
        </a>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeHref === link.href ? "text-tedx-red" : "text-white/80 hover:text-tedx-red"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button as="a" href="#tickets" variant="primary" className="!px-6 !py-2.5 text-xs">
            Get Tickets
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-tedx-black/98 backdrop-blur-md border-t border-white/10 px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`text-base font-medium py-2.5 transition-colors ${
                activeHref === link.href ? "text-tedx-red" : "text-white/85 hover:text-tedx-red"
              }`}
            >
              {link.label}
            </a>
          ))}
          <Button as="a" href="#tickets" variant="primary" onClick={closeMenu} className="w-fit mt-3">
            Get Tickets
          </Button>
        </div>
      )}

      <div
        className="h-0.5 bg-tedx-red transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </header>
  );
}
