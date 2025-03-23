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
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  // Preload all images when component mounts
  useEffect(() => {
    const imagePromises = features.map(feature => {
      return new Promise<void>((resolve, reject) => {
        const img = new window.Image()
        img.src = feature.image
        img.onload = () => resolve()
        img.onerror = () => reject()
      })
    })
    
    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(err => console.error("Error preloading images:", err))
  }, [features])
  
  // Auto advance has been removed - no more auto scrolling
  
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
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    })
  }

  // Track the direction of navigation for animations
  const [[page, direction], setPage] = useState([0, 0])

  // Update both page and direction when active step changes
  useEffect(() => {
    const newDirection = activeStep > page ? 1 : -1
    setPage([activeStep, newDirection])
  }, [activeStep])

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
            {/* Preload all images */}
            <div className="hidden">
              {features.map((feature) => (
                <Image
                  key={`preload-${feature.step}`}
                  src={feature.image}
                  alt="preload"
                  width={1}
                  height={1}
                  priority
                />
              ))}
            </div>
            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {features.map((feature, index) => 
                index === activeStep && (
                  <motion.div
                    key={`mobile-image-${feature.step}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.3 },
                      x: { type: "spring", stiffness: 350, damping: 35 },
                      scale: { duration: 0.3 }
                    }}
                    className="flex items-center justify-center w-full h-full py-6"
                  >
                    <div className="w-[90%] relative aspect-[3/2] flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={500}
                        height={350}
                        className="max-w-full max-h-full w-auto h-auto object-contain animate-subtle-float"
                        priority={true}
                      />
                    </div>
                    <div className="absolute inset-0 bg-card-gradient opacity-40 mix-blend-multiply"></div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Mobile Navigation */}
          <motion.div 
            className="flex justify-between items-center"
            variants={itemVariants}
          >
            <button 
              onClick={goToPrevStep}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shadow-lg"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeStep ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50"
                  )}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={goToNextStep}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shadow-lg"
              aria-label="Next step"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
          
          {/* Mobile step text */}
          <motion.div variants={itemVariants}>
            <AnimatePresence mode="wait">
              {features.map((feature, index) => 
                index === activeStep && (
                  <motion.div
                    key={`mobile-text-${feature.step}`}
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
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Desktop version (side by side) */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-10">
          <motion.div 
            className="order-2 space-y-8"
            variants={itemVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={`desktop-text-${feature.step}`}
                className={cn(
                  "flex items-start gap-6 p-6 rounded-xl transition-all duration-300 cursor-pointer",
                  index === activeStep ? "glass-effect" : "hover:bg-white/5"
                )}
                initial={{ opacity: 0.7 }}
                animate={{ 
                  opacity: 1,
                  scale: index === activeStep ? 1.02 : 1,
                  y: index === activeStep ? -5 : 0
                }}
                transition={{ duration: 0.4 }}
                onClick={() => handleStepClick(index)}
                whileHover={{ x: 5 }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full bg-accent-gradient flex items-center justify-center relative shrink-0",
                  "shadow-lg shadow-accent/20"
                )}>
                  {feature.icon}
                  {index === activeStep && (
                    <div className="absolute inset-0 rounded-full bg-white/30 animate-ping-slow opacity-0"></div>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-neutral font-normal">
                    {feature.content}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {/* Desktop navigation arrows */}
            <div className="flex justify-center space-x-4 mt-6">
              <button 
                onClick={goToPrevStep}
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shadow-lg"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={goToNextStep}
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors shadow-lg"
                aria-label="Next step"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Desktop version image carousel */}
          <motion.div 
            className="order-1 relative rounded-xl overflow-hidden"
            variants={itemVariants}
          >       
            {/* Preload all images */}
            <div className="hidden">
              {features.map((feature) => (
                <Image
                  key={`preload-desktop-${feature.step}`}
                  src={feature.image}
                  alt="preload"
                  width={1}
                  height={1}
                  priority
                />
              ))}
            </div>
                 
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {features.map((feature, index) => 
                index === activeStep && (
                  <motion.div
                    key={`desktop-image-${feature.step}`}
                    className="rounded-xl overflow-hidden glass-effect h-[450px] flex items-center justify-center relative"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      opacity: { duration: 0.3 },
                      x: { type: "spring", stiffness: 350, damping: 35 },
                      scale: { duration: 0.3 }
                    }}
                  >
                    <div className="relative w-[90%] h-[90%] flex items-center justify-center">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={500}
                        height={350}
                        className="max-w-full max-h-full w-auto h-auto object-contain animate-subtle-float"
                        priority={true}
                      />
                    </div>
                    <div className="absolute inset-0 bg-card-gradient opacity-40 mix-blend-multiply"></div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}