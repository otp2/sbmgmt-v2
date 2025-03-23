"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Calendar, ArrowRight } from "lucide-react"
import { StarBorder } from "@/components/ui/star-border"
import Link from "next/link"
import Script from 'next/script'

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real application, you would submit this data to your backend or Netlify Forms
    console.log(values)

    // Submit to Netlify Forms using modern approach
    try {
      // Convert form values to string to ensure compatibility with URLSearchParams
      const formValues = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, String(value)])
      );
      
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact-form',
          ...formValues
        }).toString()
      });
      
      if (response.ok) {
        // Simulate form submission
        setIsSubmitted(true);
      } else {
        console.error('Form submission failed:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
    }
  }

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
    <div className="relative overflow-hidden py-12 md:py-14 lg:py-16">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl floating-element"></div>
      <div
        className="absolute bottom-1/3 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl floating-element"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="heading-large mb-4">Get In Touch</h1>
            <p className="hero-subtitle text-balance">
              We're here to help with any questions about our services. Reach out, and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-silver/5 p-8 rounded-lg border border-silver/20 text-center">
                  <div className="w-16 h-16 bg-accent-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-neutral">Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-netlify="true" name="contact-form" method="POST">
                    <input type="hidden" name="form-name" value="contact-form" />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-silver">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-background/50 border-silver/20 focus:border-silver" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-silver">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-background/50 border-silver/20 focus:border-silver" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-silver">Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px] bg-background/50 border-silver/20 focus:border-silver" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <button type="submit" className="w-full bg-button-gradient text-primary-foreground py-3 px-8 rounded-full shadow-lg shadow-primary/20 font-medium text-base border border-silver/40 hover:opacity-90 transition-opacity">
                      Send Message
                    </button>
                  </form>
                </Form>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5">
                <h2 className="text-2xl font-bold mb-6">Other Ways to Reach Us</h2>

                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="bg-accent-gradient p-3 rounded-full shadow-lg shadow-accent/20 flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Email</h3>
                      <p className="text-neutral text-lg mb-2">We'll respond within 24 hours</p>
                      <a href="mailto:sbmgservice2024@gmail.com" className="text-silver hover:text-white transition-colors">
                        sbmgservice2024@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="bg-accent-gradient p-3 rounded-full shadow-lg shadow-accent/20 flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1">Phone</h3>
                      <p className="text-neutral text-lg mb-2">Monday-Friday, 9am-5pm EST</p>
                      <a href="tel:5551234567" className="text-silver hover:text-white transition-colors">
                        (555) 123-4567
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="flex items-start gap-5 relative z-10">
                  <div className="bg-accent-gradient p-3 rounded-full shadow-lg shadow-accent/20 flex-shrink-0">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1">Schedule a Call</h3>
                    <p className="text-neutral text-lg mb-4">Book a time for a personalized consultation with our team.</p>
                    <Link 
                      href="https://calendly.com/sbmgservice2024/30min" 
                      target="_blank"
                      className="py-3 px-8 rounded-full bg-[#b3c2cc] text-black hover:bg-[#cbd5dc] transition-colors inline-block"
                    >
                      Schedule a Call
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="heading-2 mt-10 mb-6">Schedule a Consultation</h2>
          <div 
            className="calendly-inline-widget" 
            data-url="https://calendly.com/sbmgservice2024/30min" 
            style={{ minWidth: '320px', height: '700px' }} 
          />
        </div>
      </div>
    </div>
  )
}

