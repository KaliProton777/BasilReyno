import React from "react";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import ChoosePath from "@/components/sections/ChoosePath";
import About from "@/components/sections/About";
import Metrics from "@/components/sections/Metrics";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import TrustStrip from "@/components/sections/TrustStrip";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground font-sans">
      <Nav />
      <main>
        <Hero />
        <ChoosePath />
        <About />
        <Metrics />
        <Services />
        <Testimonials />
        <TrustStrip />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}