import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Do I need to know exactly what service I need before booking?",
    a: "No. The discovery call is designed to help identify the best next step based on your goals, current situation, and the type of support you need.",
  },
  {
    q: "Do you work with individuals or only companies?",
    a: "Both. Basil works with founders, leaders, sales professionals, entrepreneurs, financial advisors, and organizations.",
  },
  {
    q: "Can I request sales training for my team?",
    a: "Yes. Sales training can be customized based on your team's industry, current challenges, and goals.",
  },
  {
    q: "Can I talk to you about insurance or investments?",
    a: "Yes. You may request a financial planning discussion focused on protection, income security, family needs, and long-term goals.",
  },
  {
    q: "Do you offer AI consulting?",
    a: "Yes. Basil helps leaders and teams explore AI tools, workflows, automation, and future-ready business systems.",
  },
  {
    q: "What happens after I fill out the form?",
    a: "Your answers will be reviewed so the next conversation can be more focused, relevant, and useful.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ backgroundColor: "#0B0B0B" }}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div
          className="flex items-center gap-6 py-8"
          style={{ borderBottom: "1px solid rgba(200,162,74,0.1)" }}
        >
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "#C8A24A" }}>07</span>
          <span className="text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "#555" }}>FAQ</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "rgba(200,162,74,0.1)" }} />
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 py-16 lg:py-20">
          <div>
            <h2
              className="font-bold sticky top-24"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "#FFFFFF",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y" style={{ borderTop: "1px solid rgba(200,162,74,0.1)", borderColor: "rgba(200,162,74,0.1)" }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  className="flex items-center justify-between w-full py-6 text-left gap-6"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span
                    className="font-medium text-sm"
                    style={{ color: open === i ? "#C8A24A" : "#FFFFFF", transition: "color 0.2s" }}
                  >
                    {faq.q}
                  </span>
                  <span className="flex-shrink-0" style={{ color: "#C8A24A" }}>
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed" style={{ color: "#666" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
