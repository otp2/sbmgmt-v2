import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function ThankYou() {
  return (
    <main className="flex-1">
      <section className="container max-w-5xl py-12 md:py-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Thank you for your interest!
          </h1>
          <p className="text-neutral text-lg max-w-2xl mx-auto">
            Your form has been successfully submitted. We'll be in touch shortly.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-card/40 backdrop-blur-sm p-6 rounded-xl border border-silver/10">
          <h2 className="text-2xl font-heading font-bold mb-4 text-center">
            Ready to Schedule an Appointment?
          </h2>
          <p className="text-neutral text-center mb-6">
            Skip the wait and book a consultation directly using our calendar below.
          </p>
          
          {/* Calendly inline widget - with reduced height */}
          <div 
            className="rounded-lg overflow-hidden border border-silver/10"
            style={{ height: "600px" }} // Reduced height from the original
          >
            <iframe
              src="https://calendly.com/sbmgservice2024/30min"
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  )
}

