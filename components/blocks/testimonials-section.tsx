"use client"

import { useRef, useEffect, useState } from "react"
import { Testimonial } from "@/components/ui/testimonial-card"

const testimonials = [
  {
    quote: "I signed up and got paid fast. It really helped me cover my college bills without any hassle.",
    name: "J.D.",
    affiliation: "Indiana University"
  },
  {
    quote: "Between classes and a part-time job, I was surprised at how easy it was to earn some extra cash with SB Management.",
    name: "A.M.",
    affiliation: "Purdue University"
  },
  {
    quote: "I'm busy at work, but SB Management made everything simple. I got the extra cash I needed without any fuss.",
    name: "R.L.",
    affiliation: "Chicago"
  },
  {
    quote: "I wasn't sure at first, but SB Management kept it real and delivered as promised. I'm happy with the results.",
    name: "T.S.",
    affiliation: "Philadelphia"
  }
];

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#22252d]">
      {/* Decorative elements with enhanced animations */}
      <div className="absolute top-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
      <div className={`absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float`}></div>
      <div
        className={`absolute bottom-1/3 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-subtle`}
        style={{ animationDelay: "1.2s" }}
      ></div>
      <div
        className={`absolute top-1/2 left-1/4 w-32 h-32 bg-silver/5 rounded-full blur-3xl animate-float`}
        style={{ animationDelay: "0.8s" }}
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-12 lg:py-14">
        <div className={`max-w-4xl mx-auto mb-8 text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationFillMode: "forwards" }}>
          <h2 className="heading-2 mb-4">What Our <span className="text-[#9ca3af] gradient-text-underline">Clients</span> Say</h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto font-normal">
            Real experiences from people who've partnered with SB Management to access exclusive opportunities.
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index} 
              {...testimonial} 
              className={isVisible ? 'animate-fade-in-up opacity-0' : 'opacity-0'}
              style={{ 
                animationDelay: `${300 + index * 150}ms`,
                animationFillMode: "forwards"
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 