import { motion } from "framer-motion";
import basilPortrait from "@assets/image_1778675892291.png";

const roles = ["Sales Trainer", "Business Consultant", "AI Strategist", "Financial Advisor"];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "#0B0B0B" }}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundColor: "#C8A24A", opacity: 0.4 }}
      />

      <div className="flex-1 max-w-screen-xl mx-auto w-full px-6 lg:px-10 pt-28 pb-16 grid lg:grid-cols-[1fr_420px] gap-0 items-end">

        {/* Left — text */}
        <div className="flex flex-col justify-between h-full py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p
              className="text-[10px] font-medium tracking-[0.35em] uppercase mb-10"
              style={{ color: "#C8A24A" }}
            >
              Personal Brand · Philippines
            </p>

            <h1
              className="font-bold leading-none mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                color: "#FFFFFF",
                letterSpacing: "-0.02em",
              }}
            >
              Basil<br />
              <span style={{ color: "#C8A24A" }}>Reyno</span>
            </h1>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
              {roles.map((r, i) => (
                <motion.span
                  key={r}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] uppercase"
                  style={{ color: "#9a9490" }}
                >
                  {i > 0 && <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#C8A24A", opacity: 0.5, display: "inline-block" }} />}
                  {r}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="max-w-lg text-sm leading-relaxed mb-12"
              style={{ color: "#666" }}
            >
              I help founders, leaders, sales professionals, and growth-minded individuals
              build income, influence, and impact — through strategy, systems, and a
              future-ready mindset.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#"
                data-cta="calendar"
                className="px-7 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#C8A24A", color: "#0B0B0B" }}
              >
                Book a Discovery Call
              </a>
              <a
                href="#"
                data-cta="form"
                className="px-7 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
                style={{ border: "1px solid rgba(200,162,74,0.4)", color: "#C8A24A" }}
              >
                Interest Form
              </a>
            </motion.div>
          </motion.div>

          {/* Bottom scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex items-center gap-4"
          >
            <div className="w-8 h-px" style={{ backgroundColor: "#C8A24A" }} />
            <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "#444" }}>
              Scroll to explore
            </span>
          </motion.div>
        </div>

        {/* Right — portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative self-end hidden lg:block"
        >
          {/* Gold offset frame */}
          <div
            className="absolute -top-4 -right-4 w-full h-full pointer-events-none"
            style={{ border: "1px solid rgba(200,162,74,0.3)" }}
          />
          <div
            className="absolute -top-8 -right-8 w-16 h-16 pointer-events-none"
            style={{ borderTop: "2px solid #C8A24A", borderRight: "2px solid #C8A24A", opacity: 0.7 }}
          />
          <div
            className="absolute -bottom-4 -left-4 w-8 h-8 pointer-events-none"
            style={{ borderBottom: "1px solid #C8A24A", borderLeft: "1px solid #C8A24A", opacity: 0.5 }}
          />

          <img
            src={basilPortrait}
            alt="Basil Reyno"
            className="w-full object-cover object-top"
            style={{ maxHeight: "620px", display: "block", filter: "brightness(0.95) contrast(1.05)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
            style={{ background: "linear-gradient(to top, #0B0B0B 0%, transparent 100%)" }}
          />
        </motion.div>
      </div>

      {/* Bottom edge line */}
      <div className="max-w-screen-xl mx-auto w-full px-6 lg:px-10">
        <div className="h-px" style={{ backgroundColor: "rgba(200,162,74,0.15)" }} />
      </div>
    </section>
  );
}
