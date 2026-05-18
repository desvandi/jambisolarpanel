"use client";

import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { SolutionCards } from "@/components/landing/SolutionCards";
import { TrustSection } from "@/components/landing/TrustSection";
import { ProductSection } from "@/components/landing/ProductSection";
import { ProblemSolutionSection } from "@/components/landing/ProblemSolutionSection";
import { SavingsCalculator } from "@/components/landing/SavingsCalculator";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { UrgencySection } from "@/components/landing/UrgencySection";
import { LeadFormSection } from "@/components/landing/LeadFormSection";
import { Footer } from "@/components/landing/Footer";
import { FloatingButtons } from "@/components/landing/FloatingButtons";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1">
        {/* Hero - Above The Fold */}
        <HeroSection />

        {/* Solution Overview Cards */}
        <SolutionCards />

        {/* Trust Section */}
        <TrustSection />

        {/* Product/Service Section */}
        <ProductSection />

        {/* Problem → Solution */}
        <ProblemSolutionSection />

        {/* ROI Calculator */}
        <SavingsCalculator />

        {/* PLN vs Solar Comparison */}
        <ComparisonSection />

        {/* Social Proof */}
        <SocialProofSection />

        {/* FAQ */}
        <FAQSection />

        {/* Urgency / Promo */}
        <UrgencySection />

        {/* Lead Capture Form */}
        <LeadFormSection />
      </main>

      <Footer />

      {/* Floating Elements */}
      <FloatingButtons />
      <ExitIntentPopup />
    </div>
  );
}
