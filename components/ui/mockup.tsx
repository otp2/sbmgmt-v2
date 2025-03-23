"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "responsive" | "phone" | "browser"
  imageContain?: boolean
}

const Mockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ className, type = "responsive", imageContain = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-lg border border-border bg-background shadow-lg",
          {
            "aspect-video w-full": type === "responsive",
            "mx-auto h-[600px] w-[300px]": type === "phone",
            "w-full": type === "browser",
          },
          className,
        )}
        {...props}
      >
        {type === "browser" && (
          <div className="flex h-8 items-center border-b border-border bg-secondary/20 px-3">
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-neutral" />
              <div className="h-2 w-2 rounded-full bg-neutral" />
              <div className="h-2 w-2 rounded-full bg-neutral" />
            </div>
            <div className="ml-4 h-4 flex-1 rounded-full bg-border" />
          </div>
        )}
        {type === "phone" && (
          <div className="absolute inset-x-0 top-0 z-10 flex h-6 items-center justify-center border-b border-border bg-secondary/20">
            <div className="h-2 w-20 rounded-full bg-border" />
          </div>
        )}
        <div
          className={cn("h-full w-full", {
            "pt-6": type === "phone",
            "flex items-center justify-center": imageContain,
          })}
        >
          {children}
        </div>
      </div>
    )
  },
)
Mockup.displayName = "Mockup"

interface MockupFrameProps extends React.HTMLAttributes<HTMLDivElement> {}

const MockupFrame = React.forwardRef<HTMLDivElement, MockupFrameProps>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative mx-auto px-0", className)} {...props}>
      {children}
    </div>
  )
})
MockupFrame.displayName = "MockupFrame"

export { Mockup, MockupFrame }

