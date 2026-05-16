import { motion } from "framer-motion";

// PLACEHOLDER: Replace [ADD NUMBER] values with real data before publishing
const stats = [
  { value: "10+", label: "Years of Experience", sub: "Business development, sales & leadership" },
  { value: "[#]", label: "Professionals Trained", sub: "Sales teams, entrepreneurs, advisors" },  // PLACEHOLDER
  { value: "[#]", label: "Businesses Empowered", sub: "From startups to growing organizations" },  // PLACEHOLDER
  { value: "[#]", label: "Industries Served", sub: "Sales, finance, tech, education & more" },  // PLACEHOLDER
];

export default function Metrics() {
  return (
    <section style={{ backgroundColor: "#F5F2EA", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#C8A24A" }}>03</span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#999" }}>Impact in Numbers</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="py-12 px-6 lg:px-10"
            >
              <p
                className="font-bold leading-none mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "#111",
                }}
              >
                {s.value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "#C8A24A" }}>
                {s.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#888" }}>
                {s.sub}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
