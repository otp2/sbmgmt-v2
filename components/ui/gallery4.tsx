"use client"

import type React from "react"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel"

export interface Gallery4Item {
  id: string
  title: string
  description: string
  href: string
  image: string
  icon?: React.ReactNode
  highlight?: string
}

export interface Gallery4Props {
  title?: string
  description?: string
  items: Gallery4Item[]
}

const Gallery4 = ({
  title = "How It Works",
  description = "We help you take advantage of exclusive offers from top platforms. No cost, no catch—just sign up and get started.",
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!carouselApi) {
      return
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
      setCurrentSlide(carouselApi.selectedScrollSnap())
    }
    updateSelection()
    carouselApi.on("select", updateSelection)
    return () => {
      carouselApi.off("select", updateSelection)
    }
  }, [carouselApi])

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="section-divider"></div>

      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="heading-2 mb-4 relative">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="max-w-2xl text-neutral text-lg mt-6 font-normal">{description}</p>
        </div>

        <div className="flex items-center justify-end mb-8">
          <div className="flex shrink-0 gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollPrev()
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto glass-effect hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="size-5 text-accent" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => {
                carouselApi?.scrollNext()
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto glass-effect hover:bg-white/10 transition-colors"
            >
              <ArrowRight className="size-5 text-accent" />
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem key={item.id} className="max-w-[320px] pl-[20px] lg:max-w-[360px]">
                <div className="group rounded-xl">
                  <div className="group relative h-full min-h-[24rem] max-w-full overflow-hidden rounded-xl glass-effect transition-all duration-300 hover:bg-white/10">
                    <div className="absolute inset-0 h-full bg-card-gradient opacity-50 mix-blend-multiply"></div>
                    <div className="absolute inset-x-0 top-0 flex flex-col items-center p-6 text-foreground md:p-8">
                      <div className="mb-6 w-16 h-16 rounded-full bg-accent-gradient flex items-center justify-center relative shadow-lg shadow-accent/20">
                        {item.icon}
                      </div>
                      <div className="mb-4 text-2xl font-bold text-center font-heading">{item.title}</div>
                      {item.highlight && (
                        <div className="mb-4 text-lg font-medium text-center gradient-text">{item.highlight}</div>
                      )}
                      <div className="text-center text-neutral font-normal">{item.description}</div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-accent" : "bg-accent/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { Gallery4 }

