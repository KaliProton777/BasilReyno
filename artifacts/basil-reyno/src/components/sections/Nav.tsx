import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Expertise", id: "expertise" },
    { label: "Services", id: "services" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(11,11,11,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,162,74,0.12)" : "1px solid transparent",
        }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <button
            onClick={() => go("hero")}
            className="flex items-baseline gap-2.5 group"
          >
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C8A24A", letterSpacing: "0.04em" }}
            >
              Basil Reyno
            </span>
            <span
              className="hidden sm:inline text-[10px] font-medium tracking-[0.25em] uppercase opacity-60"
              style={{ color: "#C8A24A" }}
            >
              Portfolio
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-xs font-medium tracking-[0.15em] uppercase transition-colors"
                style={{ color: "#9a9490" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A24A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9a9490")}
              >
                {l.label}
              </button>
            ))}
            <a
              href="#"
              data-cta="calendar"
              className="text-xs font-medium tracking-[0.15em] uppercase px-5 py-2 transition-all"
              style={{
                color: "#0B0B0B",
                backgroundColor: "#C8A24A",
              }}
            >
              Book a Call
            </a>
          </nav>

          <button
            className="md:hidden"
            style={{ color: "#C8A24A" }}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-16"
          style={{ backgroundColor: "#0B0B0B" }}
        >
          <div className="flex flex-col p-8 gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left py-4 text-2xl font-light border-b"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#E8E3D8",
                  borderColor: "rgba(200,162,74,0.1)",
                }}
              >
                {l.label}
              </button>
            ))}
            <a
              href="#"
              data-cta="calendar"
              className="mt-6 py-3.5 text-center text-sm font-medium tracking-widest uppercase"
              style={{ backgroundColor: "#C8A24A", color: "#0B0B0B" }}
            >
              Book a Discovery Call
            </a>
          </div>
        </div>
      )}
    </>
  );
}
