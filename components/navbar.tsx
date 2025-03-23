"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, HelpCircle, FileText, Phone, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import Logo from "./logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"

interface NavItem {
  name: string
  url: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Interest Form",
    url: "/interest",
    icon: FileText,
  },
  {
    name: "FAQ",
    url: "/faq",
    icon: HelpCircle,
  },
  {
    name: "Contact",
    url: "/contact",
    icon: Phone,
  },
]

export function NavBar() {
  const [activeTab, setActiveTab] = useState("Home")
  const [isMobile, setIsMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    // Set active tab based on current URL
    const pathname = window.location.pathname
    const currentTab = navItems.find(item => 
      pathname === item.url || 
      (pathname !== '/' && item.url !== '/' && pathname.startsWith(item.url))
    )
    if (currentTab) {
      setActiveTab(currentTab.name)
    } else if (pathname === '/') {
      setActiveTab('Home')
    }

    handleResize()
    handleScroll()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle navigation click
  const handleNavClick = (name: string) => {
    setActiveTab(name)
    setSheetOpen(false) // Close the sheet on mobile when a nav item is clicked
  }

  // Animation variants for navbar items
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        ease: "easeOut",
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.header
      initial="hidden"
      animate={mounted ? "visible" : "hidden"}
      variants={navbarVariants}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-silver/10 py-2 shadow-md shadow-black/5" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <motion.div variants={itemVariants}>
          <Link href="/" className="flex items-center gap-2 group">
            <div className="transition-transform duration-500 group-hover:scale-105">
              <Logo size={36} />
            </div>
            <span className="font-heading font-bold text-lg text-silver group-hover:text-white transition-colors duration-300">
              Management
            </span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div key={item.name} variants={itemVariants} custom={index}>
              <Link
                href={item.url}
                onClick={() => handleNavClick(item.name)}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors duration-300",
                  "text-foreground/80 hover:text-silver group flex flex-col items-center",
                  activeTab === item.name && "text-silver",
                )}
              >
                <span className="relative">
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-[1px] bg-silver/40 transition-all duration-300"></span>
                </span>
                {activeTab === item.name && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div variants={itemVariants} className="hidden md:block">
          <Button asChild className="bg-button-gradient font-medium relative overflow-hidden group">
            <Link href="/interest">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer bg-[length:200%_100%]"></span>
            </Link>
          </Button>
        </motion.div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="md:hidden">
            <motion.div variants={itemVariants}>
              <Button variant="ghost" size="icon" className="relative">
                <Menu className="h-5 w-5 transition-transform duration-300 hover:scale-110" />
                <span className="sr-only">Open menu</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-l border-silver/20">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left font-heading flex items-center gap-2">
                <Logo size={28} />
                SB Management
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name
                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    onClick={() => handleNavClick(item.name)}
                    className={cn(
                      "flex items-center gap-2 font-medium group transition-transform duration-300 hover:translate-x-1",
                      isActive ? "text-silver" : "text-foreground/80 hover:text-silver"
                    )}
                  >
                    <Icon size={18} className={cn(
                      "transition-colors duration-300",
                      isActive ? "text-accent" : "group-hover:text-accent"
                    )} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
              <Button 
                asChild 
                className="mt-4 bg-button-gradient font-medium relative overflow-hidden group"
                onClick={() => setSheetOpen(false)}
              >
                <Link href="/interest">
                  <span className="relative z-10">Get Started</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  )
}
