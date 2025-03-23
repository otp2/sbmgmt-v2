"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar } from "lucide-react"

export default function ThankYou() {
  useEffect(() => {
    // Initialize Calendly when component mounts
    const calendlyScript = document.createElement('script');
    calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
    calendlyScript.async = true;
    document.body.appendChild(calendlyScript);
    
    return () => {
      // Clean up on unmount
      if (document.body.contains(calendlyScript)) {
        document.body.removeChild(calendlyScript);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5 text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-accent-gradient rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Joining!</h1>
          <p className="text-neutral mb-6">
            Your application has been received. Our team will review your information and contact you shortly with next steps.
          </p>
          <p className="text-neutral mb-6">
            To expedite the process, you can schedule a consultation using our booking system below.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
        
        <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-accent-gradient p-3 rounded-full shadow-lg shadow-accent/20 flex-shrink-0">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">Book Your Consultation</h2>
          </div>
          <p className="text-neutral mb-6">
            Select a convenient time to discuss your opportunities with our team of experts.
          </p>
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/sbmgservice2024/30min" 
            style={{ minWidth: '320px', height: '630px' }}
          />
        </div>
      </div>
    </div>
  )
}

