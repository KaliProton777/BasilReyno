import { motion } from "framer-motion";

const services = [
  {
    n: "01",
    title: "Business Consulting",
    tags: ["Strategy", "Offer Design", "Sales Systems", "Growth Roadmap"],
    description: "Strategic guidance for founders, entrepreneurs, and leaders who need clarity, stronger offers, better sales systems, and scalable business structure.",
    includes: ["Business strategy", "Offer design", "Sales system design", "Team structure", "CRM and workflow planning", "Growth roadmap"],
    cta: "Book a Discovery Call",
    ctaType: "calendar",
    dark: false,
  },
  {
    n: "02",
    title: "Sales Training",
    tags: ["Teams", "Advisors", "Organizations"],
    description: "Practical training for sales teams, advisors, agencies, and organizations that want stronger performance, better follow-up, and more consistent results.",
    includes: ["Prospecting", "Approaching", "Presentations", "Follow-up", "Objection handling", "Referrals", "Sales mindset", "Team accountability"],
    cta: "Request Sales Training",
    ctaType: "form",
    dark: true,
  },
  {
    n: "03",
    title: "1-on-1 Coaching",
    tags: ["Individual", "Career Growth", "Leadership"],
    description: "Personalized guidance for individuals who want clarity, accountability, confidence, and direction in their career, leadership, sales, or business growth.",
    includes: ["Sales professionals", "New leaders", "Entrepreneurs", "Financial advisors", "Content creators", "Professionals in transition"],
    cta: "Apply for Coaching",
    ctaType: "form",
    dark: false,
  },
  {
    n: "04",
    title: "AI & Future-Ready Strategy",
    tags: ["AI Tools", "Automation", "Productivity"],
    description: "Guidance for leaders and teams who want to use AI to simplify work, automate workflows, and prepare their organization for the future.",
    includes: ["AI workflow design", "ChatGPT systems", "Sales & marketing automation", "Team productivity systems", "Future-ready organization strategy"],
    cta: "Explore AI Strategy",
    ctaType: "form",
    dark: true,
  },
  {
    n: "05",
    title: "Insurance & Financial Protection",
    tags: ["Protection", "Income Security", "Family Planning"],
    description: "A professional conversation for individuals and families who want to protect income, health, family, and long-term financial goals.",
    includes: ["Life insurance conversations", "Health protection", "Income protection", "Family protection planning", "Financial needs review"],
    cta: "Start a Financial Discussion",
    ctaType: "form",
    dark: false,
  },
];

export default function Services() {
  return (
    <section id="services" style={{ backgroundColor: "#0B0B0B" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(200,162,74,0.1)" }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#C8A24A" }}>04</span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#555" }}>Services</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(200,162,74,0.1)" }} />
        </div>

        <div className="py-16 lg:py-20">
          <h2
            className="font-bold mb-12"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
            }}
          >
            How I Can Help You Grow
          </h2>

          {/* Services list */}
          <div className="space-y-0 divide-y" style={{ borderTop: "1px solid rgba(200,162,74,0.1)", borderColor: "rgba(200,162,74,0.1)" }}>
            {services.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="grid lg:grid-cols-[80px_1fr_1fr] gap-6 lg:gap-10 py-10 group"
                style={{ borderColor: "rgba(200,162,74,0.1)" }}
              >
                {/* Number */}
                <div className="flex items-start">
                  <span
                    className="text-5xl font-light leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "rgba(200,162,74,0.2)" }}
                  >
                    {s.n}
                  </span>
                </div>

                {/* Left content */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-medium tracking-widest uppercase px-2.5 py-1"
                        style={{ border: "1px solid rgba(200,162,74,0.25)", color: "#C8A24A" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3
                    className="font-bold mb-4 text-xl"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#FFFFFF", fontSize: "1.4rem" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                    {s.description}
                  </p>
                </div>

                {/* Right content */}
                <div className="flex flex-col justify-between">
                  <div className="mb-6">
                    <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "#C8A24A" }}>
                      Includes
                    </p>
                    <ul className="space-y-2">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-xs" style={{ color: "#666" }}>
                          <span className="mt-1.5 h-px w-3 flex-shrink-0" style={{ backgroundColor: "#C8A24A", opacity: 0.6 }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href="#"
                    data-cta={s.ctaType}
                    className="self-start px-5 py-2.5 text-xs font-medium tracking-widest uppercase transition-all hover:opacity-80"
                    style={{ border: "1px solid rgba(200,162,74,0.4)", color: "#C8A24A" }}
                  >
                    {s.cta} →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
