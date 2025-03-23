import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCheck, ClipboardCheck, DollarSign, Award, Zap, Shield, Gift, TrendingUp, CreditCard } from "lucide-react"
import { Hero } from "@/components/ui/hero"
import HowItWorksSection from "@/components/blocks/how-it-works-section"
import { TestimonialsSection } from "@/components/blocks/testimonials-section"
import Logo from "@/components/logo"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <Hero
        eyebrow={
          <div className="rounded-full bg-silver/10 p-2 glass-effect w-16 h-16 flex items-center justify-center">
            <Logo size={60} />
          </div>
        }
        title={
          <>
            <span>
              Unlock <span className="gradient-text">Exclusive</span> Offers.
            </span>
            <br />
            <span>No Risk. No Cost.</span>
          </>
        }
        subtitle="Partner with SB Management to access tailored solutions that deliver exceptional results — completely risk-free. Discover how our streamlined approach helps you get the best deals with zero cost."
        ctaText="Begin Consultation"
        ctaLink="/interest"
        mockupImage={{
          src: "/hero-image.png",
          alt: "SB Management Solutions",
          width: 1200,
          height: 800,
        }}
      />

      {/* How It Works Section - New Component */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="relative overflow-hidden py-12 md:py-14 lg:py-16">
        {/* Decorative elements with enhanced animations */}
        <div className="absolute inset-0 bg-accent-gradient opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/3 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-subtle"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-32 h-32 bg-silver/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0.8s" }}
        ></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards", animationDelay: "0.1s" }}>
              <h2 className="heading-2 mb-3">
                Ready for <span className="gradient-text">Professional Excellence?</span>
              </h2>
            </div>
            
            <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: "forwards", animationDelay: "0.3s" }}>
              <p className="text-xl text-neutral max-w-2xl mx-auto mb-6 font-normal">
                Partner with SB Management today and begin your journey toward optimized solutions and exceptional results.
              </p>
            </div>
            
            <div className="animate-scale-in opacity-0" style={{ animationFillMode: "forwards", animationDelay: "0.5s" }}>
              <Button
                asChild
                className="group py-3 px-8 rounded-full bg-button-gradient text-primary-foreground border border-silver/40 shadow-lg shadow-primary/20 font-medium text-base hover:opacity-90 transition-all duration-300 hover:shadow-xl"
              >
                <Link href="/interest">
                  <span className="relative z-10">Begin Consultation</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer bg-[length:200%_100%]"></span>
                </Link>
              </Button>
            </div>
            
            <div className="animate-fade-in opacity-0" style={{ animationFillMode: "forwards", animationDelay: "0.7s" }}>
              <p className="mt-4 text-neutral">
                Most clients experience measurable results within 7 days of implementation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

