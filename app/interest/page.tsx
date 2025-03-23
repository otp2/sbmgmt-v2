"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, UserCheck, CheckCircle, Calendar } from "lucide-react"
import { StarBorder } from "@/components/ui/star-border"
import { submitToNetlify } from "@/netlify/forms-helper"

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  state: z.string().min(1, { message: "Please select your state of residence." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  smsOptIn: z.boolean().default(false),
  emailOptIn: z.boolean().default(true),
  contactPreference: z.enum(["any", "phone", "email", "text"]).default("any"),
  ageConfirmation: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you are 21 years or older.",
  }),
})

const underAgeFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  smsOptIn: z.boolean().default(false),
  emailOptIn: z.boolean().default(true),
})

export default function InterestForm() {
  const [isOver21, setIsOver21] = useState<boolean | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formStep, setFormStep] = useState(0)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      state: "",
      email: "",
      phone: "",
      smsOptIn: false,
      emailOptIn: true,
      contactPreference: "any",
      ageConfirmation: false,
    },
  })

  const underAgeForm = useForm<z.infer<typeof underAgeFormSchema>>({
    resolver: zodResolver(underAgeFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      smsOptIn: false,
      emailOptIn: true,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real application, you would submit this data to your backend or Netlify Forms
    console.log(values)

    // Submit to Netlify Forms using helper function
    try {
      const response = await submitToNetlify('interest-form-over-21', values);
      
      if (response.ok) {
        // Simulate form submission
        setIsSubmitted(true)

        // Redirect after a delay
        setTimeout(() => {
          router.push("/thank-you")
        }, 2000)
      } else {
        console.error('Form submission failed:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
    }
  }

  const onUnderAgeSubmit = async (values: z.infer<typeof underAgeFormSchema>) => {
    // In a real application, you would submit this data to your backend or Netlify Forms
    console.log(values)

    // Submit to Netlify Forms using helper function
    try {
      const response = await submitToNetlify('interest-form-under-21', values);
      
      if (response.ok) {
        // Simulate form submission
        setIsSubmitted(true)

        // Redirect after a delay
        setTimeout(() => {
          router.push("/thank-you-under-21")
        }, 2000)
      } else {
        console.error('Form submission failed:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting to Netlify:', error);
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl floating-element"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto glass-effect p-10 rounded-xl border border-silver/10 shadow-xl shadow-black/5 text-center">
            <div className="w-20 h-20 bg-accent-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
            <p className="text-lg text-neutral mb-6">Your registration has been submitted successfully. Our team will contact you shortly to discuss the next steps.</p>
            <p className="text-neutral">Redirecting you to the confirmation page...</p>
          </div>
        </div>
      </div>
    )
  }

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
            <h1 className="heading-large mb-4">Register Your Interest</h1>
            <p className="hero-subtitle text-balance">
              Complete this form to express interest in our services and begin your journey toward exclusive opportunities.
            </p>
          </div>

          {isOver21 === null && (
            <div className="glass-effect p-10 rounded-xl border border-silver/10 shadow-xl shadow-black/5 text-center">
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-bold mb-6">Age Verification</h2>
                <p className="text-lg text-neutral mb-8">
                  To proceed with registration, please confirm that you are 21 years of age or older.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setIsOver21(true)}
                    className="w-full sm:w-auto py-3 px-8 rounded-full bg-button-gradient text-primary-foreground border border-silver/40 shadow-lg shadow-primary/20 font-medium text-base hover:opacity-90 transition-opacity"
                  >
                    Yes, I am 21+
                  </button>
                  <button 
                    onClick={() => setIsOver21(false)}
                    className="w-full sm:w-auto py-3 px-8 rounded-full bg-button-gradient text-primary-foreground border border-silver/40 shadow-lg shadow-primary/20 font-medium text-base hover:opacity-90 transition-opacity"
                  >
                    No, I am under 21
                  </button>
                </div>
              </div>
            </div>
          )}

          {isOver21 === true && (
            <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Registration Form</h2>
                <div className="flex space-x-1">
                  {[0, 1].map((step) => (
                    <div 
                      key={step} 
                      className={`w-3 h-3 rounded-full ${formStep === step ? "bg-silver" : "bg-silver/20"}`}
                    ></div>
                  ))}
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-netlify="true" name="interest-form-over-21" method="POST">
                  <input type="hidden" name="form-name" value="interest-form-over-21" />
                  
                  {formStep === 0 ? (
                    <>
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-silver">Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" className="bg-background/50 border-silver/20 focus:border-silver" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-silver">State of Residence</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background/50 border-silver/20 focus:border-silver">
                                  <SelectValue placeholder="Select your state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[200px]">
                                {states.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-silver">Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" className="bg-background/50 border-silver/20 focus:border-silver" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-silver">Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" className="bg-background/50 border-silver/20 focus:border-silver" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button 
                          type="button" 
                          onClick={() => {
                            if (form.getValues().fullName && form.getValues().email && form.getValues().phone && form.getValues().state) {
                              setFormStep(1);
                            } else {
                              form.trigger(["fullName", "email", "phone", "state"]);
                            }
                          }}
                          className="w-full py-3 px-8 rounded-full bg-button-gradient text-primary-foreground border border-silver/40 shadow-lg shadow-primary/20 font-medium text-base hover:opacity-90 transition-opacity"
                        >
                          Continue
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-6">
                        <div className="bg-secondary/20 p-4 rounded-lg">
                          <h3 className="font-medium mb-2">Contact Preferences</h3>
                          <p className="text-neutral text-sm mb-4">
                            Let us know how you prefer to be contacted about exclusive offers and updates.
                          </p>
                          
                          <FormField
                            control={form.control}
                            name="contactPreference"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-silver">Preferred Contact Method</FormLabel>
                                <div className="space-y-2">
                                  {[
                                    { id: 'any', label: 'Any method (recommended)' },
                                    { id: 'phone', label: 'Phone call' },
                                    { id: 'email', label: 'Email' },
                                    { id: 'text', label: 'Text message' },
                                  ].map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                      <input
                                        type="radio"
                                        id={option.id}
                                        value={option.id}
                                        checked={field.value === option.id}
                                        onChange={() => field.onChange(option.id)}
                                        className="w-4 h-4 accent-silver"
                                      />
                                      <label htmlFor={option.id} className="text-sm font-medium leading-none">
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                <FormMessage className="text-red-400" />
                              </FormItem>
                            )}
                          />
                          
                          <div className="space-y-3 mt-4">
                            <FormField
                              control={form.control}
                              name="emailOptIn"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value} 
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-silver data-[state=checked]:border-silver"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm">
                                      I agree to receive email communications about offers and updates.
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="smsOptIn"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox 
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="data-[state=checked]:bg-silver data-[state=checked]:border-silver"
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm">
                                      I agree to receive SMS text messages about offers and updates.
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="ageConfirmation"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox 
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-silver data-[state=checked]:border-silver"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I confirm that I am 21 years or older and agree to the terms and conditions.
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex gap-3 pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setFormStep(0)}
                            className="flex-1 py-3 px-8 rounded-full border border-silver/30 hover:border-silver hover:text-silver font-medium text-base"
                          >
                            Back
                          </Button>
                          <button type="submit" className="flex-[2] py-3 px-8 rounded-full bg-button-gradient text-primary-foreground border border-silver/40 shadow-lg shadow-primary/20 font-medium text-base hover:opacity-90 transition-opacity">
                            Complete Registration
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </form>
              </Form>
              
              <div className="mt-8 pt-6 border-t border-silver/10">
                <div className="flex items-center gap-3">
                  <div className="bg-accent-gradient p-2 rounded-full shadow-lg shadow-accent/20 flex-shrink-0">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-neutral text-sm">
                    After registration, our team will contact you to schedule a consultation and walk you through the next steps.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isOver21 === false && (
            <div className="glass-effect p-8 rounded-xl border border-silver/10 shadow-xl shadow-black/5">
              <div className="max-w-lg mx-auto">
                <h2 className="text-2xl font-bold mb-4">Under 21 Registration</h2>
                <p className="text-neutral mb-6">
                  We have special programs available for those under 21. Please provide your contact information and we'll keep you updated. <span className="text-silver">Our team will reach out to contact you in the future when appropriate opportunities become available.</span>
                </p>
                
                <Form {...underAgeForm}>
                  <form onSubmit={underAgeForm.handleSubmit(onUnderAgeSubmit)} className="space-y-6" data-netlify="true" name="interest-form-under-21" method="POST">
                    <input type="hidden" name="form-name" value="interest-form-under-21" />
                    
                    <FormField
                      control={underAgeForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-silver">Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="bg-background/50 border-silver/20 focus:border-silver" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={underAgeForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-silver">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" className="bg-background/50 border-silver/20 focus:border-silver" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-3">
                      <FormField
                        control={underAgeForm.control}
                        name="emailOptIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-silver data-[state=checked]:border-silver"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to receive email communications about offers and updates.
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={underAgeForm.control}
                        name="smsOptIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-silver data-[state=checked]:border-silver"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to receive SMS text messages about offers and updates.
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>

                    <button type="submit" className="w-full py-3 px-8 rounded-full bg-button-gradient text-primary-foreground border border-silver/40 shadow-lg shadow-primary/20 font-medium text-base hover:opacity-90 transition-opacity">
                      Submit Information
                    </button>
                  </form>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

