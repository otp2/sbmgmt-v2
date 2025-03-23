import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYouUnder21() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Interest!</h1>
        <p className="text-neutral mb-8">
          You've been added to our waiting list. We'll notify you when you're eligible to join SB Management Group.
        </p>
        <p className="text-neutral mb-8">
          In the meantime, feel free to explore our website to learn more about what we offer.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}

