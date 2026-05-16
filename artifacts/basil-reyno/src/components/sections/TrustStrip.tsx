import { motion } from "framer-motion";

// PLACEHOLDER: Replace with real logos or remove this section before publishing.
const logos = ["Logo Placeholder", "Logo Placeholder", "Logo Placeholder", "Logo Placeholder", "Logo Placeholder"];

export default function TrustStrip() {
  return (
    <section style={{ backgroundColor: "#111111" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(200,162,74,0.1)" }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#C8A24A" }}>06</span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#555" }}>As Seen In</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(200,162,74,0.1)" }} />
        </div>

        <div className="py-12 flex flex-wrap justify-center gap-4">
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center justify-center px-8 py-4"
              style={{
                border: "1px solid rgba(200,162,74,0.12)",
                minWidth: "130px",
                height: "52px",
              }}
            >
              <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "#333" }}>
                {logo}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
