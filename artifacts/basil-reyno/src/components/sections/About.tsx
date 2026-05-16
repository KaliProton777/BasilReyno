import { motion } from "framer-motion";
import basilPortrait from "@assets/image_1778675892291.png";

export default function About() {
  return (
    <section id="about" style={{ backgroundColor: "#F5F2EA" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase"
            style={{ color: "#C8A24A" }}
          >
            01
          </span>
          <span
            className="text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "#999" }}
          >
            About
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(0,0,0,0.08)" }} />
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-24 py-16 lg:py-20">

          {/* Left — portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mb-12 lg:mb-0"
          >
            <div className="relative inline-block w-full">
              {/* Offset label */}
              <div
                className="absolute -top-3 left-6 px-3 py-1 z-10"
                style={{ backgroundColor: "#C8A24A" }}
              >
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase" style={{ color: "#0B0B0B" }}>
                  Basil Reyno
                </span>
              </div>
              <img
                src={basilPortrait}
                alt="Basil Reyno"
                className="w-full object-cover object-top"
                style={{ maxHeight: "520px" }}
              />
              {/* Bottom left corner accent */}
              <div
                className="absolute bottom-6 left-6 right-6 p-5"
                style={{ backgroundColor: "rgba(11,11,11,0.85)", backdropFilter: "blur(8px)" }}
              >
                <p
                  className="text-sm italic leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#E8E3D8", fontSize: "1rem" }}
                >
                  "The future belongs to those who build, adapt, and lead with purpose."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <h2
              className="font-bold leading-tight mb-8"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "#111",
              }}
            >
              Strategy.<br />Systems.<br />Sales. Impact.
            </h2>

            <div className="space-y-5 mb-10" style={{ color: "#555", lineHeight: "1.85", fontSize: "0.9rem" }}>
              <p>
                Basil Reyno is a sales trainer, business consultant, AI strategist, and financial advisor helping founders, leaders, sales professionals, and growth-minded individuals grow in a fast-changing world.
              </p>
              <p>
                His work combines practical sales execution, business strategy, leadership development, AI-powered systems, and financial protection planning — helping clients build not just income, but direction, confidence, and long-term impact.
              </p>
            </div>

            {/* Tags grid */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {[
                { label: "Sales Trainer", desc: "Confidence, systems, results." },
                { label: "Business Consultant", desc: "Strategy, offers, growth." },
                { label: "AI Strategist", desc: "Tools, workflows, automation." },
                { label: "Financial Advisor", desc: "Protection, planning, future." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4"
                  style={{ border: "1px solid rgba(200,162,74,0.25)", borderLeft: "2px solid #C8A24A" }}
                >
                  <p className="text-xs font-semibold mb-1" style={{ color: "#111" }}>{item.label}</p>
                  <p className="text-xs" style={{ color: "#888" }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <a
                href="#"
                data-cta="calendar"
                className="px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase transition-opacity hover:opacity-80"
                style={{ backgroundColor: "#C8A24A", color: "#0B0B0B" }}
              >
                Book a Discovery Call
              </a>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-3 text-xs font-medium tracking-[0.18em] uppercase"
                style={{ border: "1px solid rgba(0,0,0,0.12)", color: "#555" }}
              >
                View Services
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
