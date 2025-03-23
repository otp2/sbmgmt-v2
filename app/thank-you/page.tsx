import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYou() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You for Joining!</h1>
        <p className="text-neutral mb-8">
          Your application has been received. Our team will review your information and contact you shortly with next
          steps.
        </p>
        <p className="text-neutral mb-8">
          In the meantime, check out our FAQ page to learn more about how SB Management Group works.
        </p>
        <Button asChild>
          <Link href="/faq">View FAQ</Link>
        </Button>
      </div>
    </div>
  )
}

