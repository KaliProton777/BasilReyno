import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const navLinks = [
  { label: "Hero", id: "hero" },
  { label: "About", id: "about" },
  { label: "Expertise", id: "expertise" },
  { label: "Services", id: "services" },
  { label: "FAQ", id: "faq" },
];

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      style={{ backgroundColor: "#0B0B0B", borderTop: "1px solid rgba(200,162,74,0.1)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Top */}
        <div className="grid lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 py-16">
          <div>
            <p
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#C8A24A" }}
            >
              Basil Reyno
            </p>
            <p className="text-xs font-medium tracking-[0.25em] uppercase mb-5" style={{ color: "#C8A24A", opacity: 0.6 }}>
              Strategy. Systems. Sales. Impact.
            </p>
            <p className="text-xs leading-relaxed mb-6" style={{ color: "#444", maxWidth: "300px" }}>
              Helping leaders, founders, sales professionals, and growth-minded individuals build future-ready income, influence, and impact.
            </p>
            <div className="flex gap-4">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  style={{ border: "1px solid rgba(200,162,74,0.2)", color: "#555" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#C8A24A"; e.currentTarget.style.borderColor = "rgba(200,162,74,0.5)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "rgba(200,162,74,0.2)"; }}
                >
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: "#C8A24A" }}>
              Navigate
            </p>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="text-xs transition-colors"
                    style={{ color: "#555" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A24A")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: "#C8A24A" }}>
              Contact
            </p>
            <ul className="space-y-3 text-xs" style={{ color: "#555" }}>
              <li><span className="text-[#444]">Email: </span>[ADD EMAIL]</li>
              <li><span className="text-[#444]">Phone: </span>[ADD PHONE]</li>
              <li><span className="text-[#444]">Location: </span>Philippines</li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: "#C8A24A" }}>
              Work Together
            </p>
            <div className="space-y-3">
              <a
                href="#"
                data-cta="calendar"
                className="block px-4 py-2.5 text-xs font-medium tracking-widest uppercase text-center transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#C8A24A", color: "#0B0B0B" }}
              >
                Book a Call →
              </a>
              <a
                href="#"
                data-cta="form"
                className="block px-4 py-2.5 text-xs font-medium tracking-widest uppercase text-center"
                style={{ border: "1px solid rgba(200,162,74,0.3)", color: "#C8A24A" }}
              >
                Interest Form →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6"
          style={{ borderTop: "1px solid rgba(200,162,74,0.08)" }}
        >
          <p className="text-[11px]" style={{ color: "#333" }}>
            &copy; 2026 Basil Reyno. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[11px] transition-colors"
                style={{ color: "#333" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C8A24A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#333")}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
