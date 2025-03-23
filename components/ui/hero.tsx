"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Mockup, MockupFrame } from "@/components/ui/mockup"
import { StarBorder } from "@/components/ui/star-border"

interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode
  subtitle?: string
  eyebrow?: React.ReactNode
  ctaText?: string
  ctaLink?: string
  mockupImage?: {
    src: string
    alt: string
    width: number
    height: number
  }
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ className, title, subtitle, eyebrow, ctaText, ctaLink, mockupImage, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col items-center relative overflow-hidden py-8 md:py-10 lg:py-12 pb-4 md:pb-6 lg:pb-8", className)} {...props}>
        {/* Decorative elements with enhanced animations */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-40 left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-40 left-1/4 w-24 h-24 bg-silver/10 rounded-full blur-3xl animate-pulse-subtle"
          style={{ animationDelay: "0.8s" }}
        ></div>

        <div className="flex flex-col items-center max-w-4xl mx-auto w-full">
          {eyebrow && (
            <div className="font-sans uppercase tracking-widest leading-[133%] text-center text-base mb-3 md:mb-4 text-accent animate-fade-in-down opacity-0" style={{ animationFillMode: "forwards", animationDelay: "0.1s" }}>
              {eyebrow}
            </div>
          )}

          <h1 className="heading-large text-center px-4 text-foreground animate-fade-in opacity-0 text-balance" style={{ animationFillMode: "forwards", animationDelay: "0.3s" }}>
            {title}
          </h1>

          {subtitle && (
            <p className="hero-subtitle px-4 mt-4 md:mt-6 mb-6 md:mb-8 animate-fade-in-up opacity-0 text-balance" style={{ animationFillMode: "forwards", animationDelay: "0.5s" }}>
              {subtitle}
            </p>
          )}

          {ctaText && ctaLink && (
            <div className="animate-scale-in opacity-0" style={{ animationFillMode: "forwards", animationDelay: "0.7s" }}>
              <Link 
                href={ctaLink} 
                className="group relative py-3 px-8 rounded-full bg-[#b3c2cc] text-black overflow-hidden hover:shadow-lg transition-all duration-300 inline-flex items-center font-medium text-base"
              >
                <span className="relative z-10 flex items-center">
                  {ctaText}
                  <svg
                    width="18"
                    height="9"
                    viewBox="0 0 20 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M15 1L19 5M19 5L15 9M19 5H1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                
                {/* Button animations */}
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer bg-[length:200%_100%]"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-glow-gradient transition-opacity duration-300"></span>
                
                {/* Button hover effect trail */}
                <span className="absolute top-0 left-[calc(100%-10px)] h-full w-10 z-0 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer bg-shine-gradient bg-[length:200%_100%] transition-all duration-0"></span>
              </Link>
            </div>
          )}
        </div>

        {mockupImage && (
          <div className="mt-6 w-full relative animate-fade-in opacity-0 mb-0" style={{ animationFillMode: "forwards", animationDelay: "0.9s" }}>
            <MockupFrame className="max-w-3xl">
              <Mockup type="responsive" className="glass-effect relative overflow-hidden" imageContain>
                {/* Blur background effect with subtle animation */}
                <div 
                  className="absolute inset-0 z-0 opacity-30 scale-110 animate-pulse-subtle" 
                  style={{ 
                    backgroundImage: `url(${mockupImage.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    filter: 'blur(15px)',
                    transform: 'scale(1.1)',
                    animationDuration: '8s',
                  }}
                ></div>
                <div className="relative z-10 flex items-center justify-center py-2 px-1">
                  <Image
                    src={mockupImage.src || "/placeholder.svg"}
                    alt={mockupImage.alt}
                    width={mockupImage.width}
                    height={mockupImage.height}
                    className="w-auto h-auto max-w-[96%] object-contain object-top"
                    priority
                  />
                </div>
              </Mockup>
            </MockupFrame>
            <div
              className="absolute bottom-0 left-0 right-0 w-full h-20"
              style={{
                background: "linear-gradient(to top, hsl(220, 10%, 15%) 0%, hsla(220, 10%, 15%, 0) 100%)",
                zIndex: 10,
              }}
            />
          </div>
        )}
      </div>
    )
  },
)
Hero.displayName = "Hero"

export { Hero }

