import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section style={{ backgroundColor: "#F5F2EA" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#C8A24A" }}>08</span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#999" }}>Let's Work Together</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        <div className="py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end"
          >
            <div>
              <h2
                className="font-bold leading-tight mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  color: "#111",
                }}
              >
                Not sure where to start?
                <br />
                <span style={{ color: "#C8A24A" }}>Start with one clear conversation.</span>
              </h2>

              <p className="text-sm leading-relaxed mb-10" style={{ color: "#666", maxWidth: "440px" }}>
                Whether you want to grow your business, improve your sales, lead your team better, use AI strategically, or plan your financial future — the next step begins with clarity.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  data-cta="calendar"
                  className="px-8 py-3.5 text-xs font-medium tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
                  style={{ backgroundColor: "#C8A24A", color: "#0B0B0B" }}
                >
                  Book a Discovery Call
                </a>
                <a
                  href="#"
                  data-cta="form"
                  className="px-8 py-3.5 text-xs font-medium tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
                  style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#555" }}
                >
                  Fill Out Interest Form
                </a>
              </div>
            </div>

            <div>
              <div
                className="p-8 lg:p-10"
                style={{ backgroundColor: "#0B0B0B", borderLeft: "3px solid #C8A24A" }}
              >
                <p
                  className="text-lg italic leading-relaxed mb-6"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "#E8E3D8",
                    fontSize: "1.2rem",
                  }}
                >
                  "The future belongs to those who build, adapt, and lead with purpose."
                </p>
                <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#C8A24A" }}>
                  Basil Reyno
                </p>
                <p className="text-[11px] mt-1" style={{ color: "#555" }}>
                  Future-Ready Business Consultant · Sales Trainer · AI Strategist · Financial Advisor
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
