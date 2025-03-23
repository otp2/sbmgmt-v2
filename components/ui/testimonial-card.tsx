"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface TestimonialProps extends React.HTMLAttributes<HTMLDivElement> {
  quote: string
  name: string
  affiliation?: string
}

const Testimonial = React.forwardRef<HTMLDivElement, TestimonialProps>(
  ({ quote, name, affiliation, className, ...props }, ref) => {
    const initials = name.split('.').join('');
    
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl p-6 transition-all duration-300 h-full flex flex-col",
          "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-transparent",
          "before:content-[''] hover:before:bg-accent-gradient/40 overflow-hidden",
          "backdrop-blur-sm bg-background/20 group",
          "hover:bg-background/30 hover:shadow-lg hover:shadow-silver/5 hover:transform hover:-translate-y-1 hover:scale-[1.01]",
          className
        )}
        {...props}
      >
        {/* Subtle gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-silver/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        
        <div className="absolute right-4 top-4 text-6xl font-serif text-silver/20 transition-all duration-300 group-hover:text-silver/30 group-hover:scale-110 group-hover:rotate-12">
          "
        </div>

        <p className="text-pretty text-foreground leading-relaxed pt-2 pb-6 flex-grow relative z-10">
          {quote}
        </p>

        <div className="flex items-center gap-4 relative z-10">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/70 flex items-center justify-center transition-all duration-300 group-hover:bg-silver/20 group-hover:shadow-sm group-hover:shadow-silver/10">
            <span className="text-sm text-silver font-medium">{initials.substring(0, 2)}</span>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-foreground transition-colors duration-300">{name}</h3>
            {affiliation && (
              <p className="text-sm text-neutral group-hover:text-neutral/80 transition-colors duration-300">
                {affiliation}
              </p>
            )}
          </div>
        </div>
        
        {/* Subtle animated gradient at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-gradient/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    )
  }
)
Testimonial.displayName = "Testimonial"

export { Testimonial } 