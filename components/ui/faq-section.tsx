"use client"

import { Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "Is this legal?",
    answer: "Yes. SB Management Group operates within all legal guidelines and compliance rules. We work with licensed and regulated platforms to provide exclusive offers to our members."
  },
  {
    question: "How does it work?",
    answer: "We help you maximize promotional opportunities with no risk. After you sign up, our team will verify your information and guide you through the process of accessing exclusive offers from our partner platforms."
  },
  {
    question: "Is there any cost to join?",
    answer: "No. There is absolutely no cost to join SB Management Group. We make our money through partnerships with platforms, not from our members."
  },
  {
    question: "Verification time?",
    answer: "The verification process typically takes 1-2 business days. Once verified, you'll receive instructions on how to access exclusive offers."
  },
  {
    question: "Required information?",
    answer: "To get started, we need your full name, state of residence, email address, and phone number. Additional verification information may be required later in the process."
  },
  {
    question: "How do I get paid?",
    answer: "Payment methods include Zelle and Venmo. Our team will provide detailed instructions for each opportunity, and you'll be able to select your preferred payment method during the process."
  },
  {
    question: "Where do you operate?",
    answer: "SB Management Group operates in all 50 US states. Our nationwide network of partner platforms allows us to serve clients across the entire United States."
  },
  {
    question: "What if I have more questions?",
    answer: "If you have additional questions, please visit our Contact page to get in touch with our support team. We're here to help!"
  }
];

function FAQ() {
  return (
    <div className="w-full py-20 lg:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl floating-element"></div>
      <div className="absolute bottom-1/3 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl floating-element" style={{ animationDelay: "2s" }}></div>
      <div className="absolute top-0 left-0 w-full h-px bg-accent-gradient opacity-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Badge variant="outline" className="border-silver/30 text-silver">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="heading-2 tracking-tighter max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-neutral mx-auto lg:mx-0 text-center lg:text-left">
                  Find answers to common questions about SB Management and our services. Can't find what you're looking for? Reach out to our team directly.
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <Button 
                  className="gap-4 bg-transparent border-silver/30 hover:border-silver hover:text-silver transition-colors" 
                  variant="outline"
                  onClick={() => window.location.href = 'mailto:sbmgservice2024@gmail.com'}
                >
                  Any questions? Send us an email <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full glass-effect p-6 rounded-xl">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index+1}`}
                className="border-b border-silver/10 last:border-b-0"
              >
                <AccordionTrigger className="text-lg font-medium hover:text-silver hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQ }; 