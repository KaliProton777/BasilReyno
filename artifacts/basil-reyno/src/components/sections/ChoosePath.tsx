import { motion } from "framer-motion";

const audiences = [
  {
    num: "A",
    title: "Founders & Business Owners",
    description: "Build a stronger business, clarify your offer, improve your sales system, and scale with confidence.",
    cta: "Book Consulting Call",
    ctaType: "calendar",
  },
  {
    num: "B",
    title: "Leaders & Organizations",
    description: "Equip your team with better sales, stronger leadership, AI tools, and execution systems.",
    cta: "Request Training",
    ctaType: "form",
  },
  {
    num: "C",
    title: "Sales Professionals",
    description: "Improve your prospecting, confidence, closing, follow-up, and daily sales momentum.",
    cta: "Explore Sales Coaching",
    ctaType: "form",
  },
  {
    num: "D",
    title: "Content Followers",
    description: "Turn inspiration into action with practical frameworks, guidance, and a clear next step.",
    cta: "Book Discovery Call",
    ctaType: "calendar",
  },
  {
    num: "E",
    title: "Financial Planning",
    description: "Talk about protection, insurance, investments, and long-term financial direction.",
    cta: "Start a Conversation",
    ctaType: "form",
  },
];

export default function ChoosePath() {
  return (
    <section id="expertise" style={{ backgroundColor: "#0B0B0B" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(200,162,74,0.1)" }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#C8A24A" }}>02</span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#555" }}>Who I Work With</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(200,162,74,0.1)" }} />
        </div>

        <div className="py-16 lg:py-20">
          <h2
            className="font-bold mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
            }}
          >
            What kind of growth are you looking for?
          </h2>
          <p className="text-sm mb-12" style={{ color: "#666" }}>
            Choose the path that fits your goals — I'll help you take it further.
          </p>

          <div className="divide-y" style={{ borderTop: "1px solid rgba(200,162,74,0.1)", borderColor: "rgba(200,162,74,0.1)" }}>
            {audiences.map((a, i) => (
              <motion.div
                key={a.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group grid grid-cols-[48px_1fr_auto] items-center gap-6 py-6 cursor-pointer"
                style={{ borderColor: "rgba(200,162,74,0.1)" }}
              >
                <span
                  className="text-xs font-medium tracking-widest"
                  style={{ color: "#C8A24A" }}
                >
                  {a.num}
                </span>
                <div>
                  <p className="font-semibold mb-1 text-sm" style={{ color: "#FFFFFF" }}>{a.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#666" }}>{a.description}</p>
                </div>
                <a
                  href="#"
                  data-cta={a.ctaType}
                  className="hidden sm:inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#C8A24A" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {a.cta} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
