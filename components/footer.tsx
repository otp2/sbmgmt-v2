import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "./logo"

export function Footer() {
  return (
    <footer className="bg-secondary/30 py-16 border-t border-border relative overflow-hidden">
      {/* Silver accent elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
      <div className="absolute bottom-1/3 right-10 w-32 h-32 rounded-full bg-silver/5 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          <div className="mb-8 rounded-full bg-silver/10 p-2 glass-effect w-24 h-24 flex items-center justify-center">
            <Logo size={96} />
          </div>
          <nav className="mb-10 flex flex-wrap justify-center gap-8">
            <Link href="/" className="font-medium tracking-wide hover:text-silver transition-colors">
              Home
            </Link>
            <Link href="/interest" className="font-medium tracking-wide hover:text-silver transition-colors">
              Consultation
            </Link>
            <Link href="/faq" className="font-medium tracking-wide hover:text-silver transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="font-medium tracking-wide hover:text-silver transition-colors">
              Contact
            </Link>
          </nav>
          <div className="mb-10 flex space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-silver/30 hover:border-silver hover:text-silver transition-colors"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-silver/30 hover:border-silver hover:text-silver transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-silver/30 hover:border-silver hover:text-silver transition-colors"
            >
              <Instagram className="h-4 w-4" />
              <span className="sr-only">Instagram</span>
            </Button>
          </div>
          <div className="mb-10 w-full max-w-md">
            <form className="flex space-x-2">
              <div className="flex-grow">
                <Input
                  placeholder="Enter your email for updates"
                  type="email"
                  className="rounded-full border-silver/30 focus:border-silver focus:ring-silver/30 bg-background/50"
                />
              </div>
              <Button type="submit" className="rounded-full bg-button-gradient font-medium">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="text-center">
            <p className="text-sm text-neutral font-normal">
              © {new Date().getFullYear()} SB Management. All rights reserved.
            </p>
            <p className="text-xs text-neutral mt-2 font-normal">
              Professional solutions tailored to meet your unique requirements.
            </p>
            <p className="text-xs text-neutral mt-2 font-normal">
              Contact us: <a href="tel:6305460465" className="text-silver hover:underline">(630) 546-0465</a>
            </p>
            <p className="text-xs text-neutral mt-2 font-normal">
              <a href="https://sbmgmt.co" className="text-silver hover:underline">sbmgmt.co</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

