import { motion } from "framer-motion";

// PLACEHOLDER: Replace with real testimonials before publishing.
const testimonials = [
  {
    quote: "Basil helped us clarify our sales process, improve accountability, and lead with more confidence.",
    name: "Client Name",
    role: "Sales Leader",
    category: "Sales Training",
  },
  {
    quote: "His strategy helped us see our business differently and identify the systems we needed to grow.",
    name: "Client Name",
    role: "Founder",
    category: "Business Consulting",
  },
  {
    quote: "The coaching gave me clarity, structure, and the confidence to take action.",
    name: "Client Name",
    role: "Professional / Entrepreneur",
    category: "1-on-1 Coaching",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ backgroundColor: "#F5F2EA" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#C8A24A" }}>05</span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#999" }}>Client Voices</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        <div className="py-16 lg:py-20">
          <h2
            className="font-bold mb-16"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#111",
            }}
          >
            What Clients & Partners Say
          </h2>

          <div className="grid lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", borderColor: "rgba(0,0,0,0.08)" }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-10 lg:px-10 first:lg:pl-0 last:lg:pr-0"
              >
                <p
                  className="text-[10px] font-medium tracking-[0.25em] uppercase mb-6"
                  style={{ color: "#C8A24A" }}
                >
                  {t.category}
                </p>
                <p
                  className="leading-relaxed mb-8"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.15rem",
                    color: "#222",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 flex items-center justify-center text-xs font-semibold"
                    style={{ backgroundColor: "#C8A24A", color: "#0B0B0B" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#111" }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color: "#999" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
