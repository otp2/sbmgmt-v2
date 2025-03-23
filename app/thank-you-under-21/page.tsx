import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouUnder21() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-accent-gradient rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Your Interest!</h1>
          <p className="text-neutral mb-6">
            You've been added to our waiting list. We'll notify you when you're eligible to join SB Management Group.
          </p>
          <p className="text-neutral mb-6">
            In the meantime, feel free to explore our website to learn more about what we offer.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

