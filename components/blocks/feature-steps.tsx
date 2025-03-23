"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Feature {
  step: string
  title: string
  content: string
  image: string
  icon: React.ReactNode
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: React.ReactNode
  description?: string
}

export function FeatureSteps({
  features,
  className,
  title = "How It Works",
  description = "We help you take advantage of exclusive offers from top platforms. No cost, no catch—just sign up and get started.",
}: FeatureStepsProps) {
  // Always start with the first step (index 0)
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  // Handle navigation to next step
  const goToNextStep = () => {
    setActiveStep(current => (current + 1) % features.length)
  }
  
  // Handle navigation to previous step
  const goToPrevStep = () => {
    setActiveStep(current => (current - 1 + features.length) % features.length)
  }
  
  // Handle clicking directly on a step
  const handleStepClick = (index: number) => {
    setActiveStep(index)
  }

  // Variants for smoother animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95
    })
  }

  // Track the direction of navigation for animations
  const [[page, direction], setPage] = useState([0, 0])

  // Update both page and direction when active step changes
  useEffect(() => {
    const newDirection = activeStep > page ? 1 : -1
    setPage([activeStep, newDirection])
  }, [activeStep, page])

  // Section animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className={cn("relative overflow-hidden py-10 md:py-12 lg:py-14", className)}
    >
      {/* Decorative elements with enhanced animations */}
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" 
           style={{ animationDuration: "15s" }}></div>
      <div
        className="absolute bottom-1/3 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s", animationDuration: "18s" }}
      ></div>
      <div
        className="absolute top-3/4 left-1/2 w-32 h-32 bg-silver/5 rounded-full blur-3xl animate-pulse-subtle"
        style={{ animationDelay: "1s" }}
      ></div>
      
      <motion.div 
        className="container relative z-10 mx-auto px-4 md:px-6"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <motion.div 
          className="max-w-4xl mx-auto mb-8 text-center"
          variants={itemVariants}
        >
          <h2 className="heading-2 mb-4 relative">
            {title}
          </h2>
          <p className="text-xl text-neutral max-w-2xl mx-auto font-normal">{description}</p>
        </motion.div>

        {/* Mobile version (stacked) */}
        <div className="flex flex-col lg:hidden gap-8 mb-8">
          <motion.div 
            className="relative rounded-xl overflow-hidden glass-effect min-h-[250px]"
            variants={itemVariants}
          >            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {features.map((feature, index) => 
                index === activeStep && (
                  <motion.div
                    key={feature.step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.4 },
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      scale: { duration: 0.4 }
                    }}
                    className="flex items-center justify-center w-full h-full py-6"
                  >
                    <div className="w-[90%] relative aspect-[3/2] flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={500}
                        height={350}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        priority={true}
                      />
                    </div>
                    <div className="absolute inset-0 bg-card-gradient opacity-40 mix-blend-multiply"></div>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* Add navigation arrows overlayed on the image for better UX */}
            <button 
              onClick={goToPrevStep}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors z-10"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={goToNextStep}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors z-10"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
          
          {/* Mobile step text */}
          <motion.div variants={itemVariants}>
            {features.map((feature, index) => 
              index === activeStep && (
                <motion.div
                  key={feature.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-4 glass-effect rounded-xl"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className={cn(
                      "w-10 h-10 rounded-full bg-accent-gradient flex items-center justify-center relative shrink-0",
                      "shadow-lg shadow-accent/20"
                    )}>
                      {feature.icon}
                      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping-slow opacity-0"></div>
                    </div>
                    <h3 className="text-xl font-heading font-semibold">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-neutral font-normal">
                    {feature.content}
                  </p>
                </motion.div>
              )
            )}
          </motion.div>
        </div>

        {/* Desktop version with side-by-side layout */}
        <div className="lg:grid grid-cols-12 gap-8 hidden">
          {/* Left side - Image display */}
          <motion.div 
            className="col-span-7 relative rounded-xl overflow-hidden glass-effect min-h-[450px]"
            variants={itemVariants}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {features.map((feature, index) => 
                index === activeStep && (
                  <motion.div
                    key={feature.step}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.5 },
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      scale: { duration: 0.5 }
                    }}
                    className="absolute inset-0 flex items-center justify-center p-10"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={800}
                        height={600}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                        priority={true}
                      />
                    </div>
                    <div className="absolute inset-0 bg-card-gradient opacity-30 mix-blend-multiply"></div>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* Add navigation arrows for desktop */}
            <button 
              onClick={goToPrevStep}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors z-10"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={goToNextStep}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors z-10"
              aria-label="Next step"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
          
          {/* Right side - Text content */}
          <div className="col-span-5">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.step}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "cursor-pointer glass-effect rounded-xl transition-all duration-300 p-5",
                    activeStep === index 
                      ? "border border-silver/30 shadow-xl shadow-accent/5" 
                      : "border border-silver/10 hover:border-silver/20"
                  )}
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center relative shrink-0",
                      activeStep === index 
                        ? "bg-accent-gradient shadow-lg shadow-accent/20" 
                        : "bg-card-gradient"
                    )}>
                      {feature.icon}
                      {activeStep === index && (
                        <div className="absolute inset-0 rounded-full bg-white/30 animate-ping-slow"></div>
                      )}
                    </div>
                    <div>
                      <span className="text-sm text-silver/70 font-medium">
                        {feature.step}
                      </span>
                      <h3 className={cn(
                        "text-xl font-heading font-semibold",
                        activeStep === index ? "text-silver" : "text-foreground"
                      )}>
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-neutral pl-14">
                    {feature.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}