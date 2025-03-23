import { UserCheck, ShieldCheck, BadgeCheck } from "lucide-react"
import { FeatureSteps } from "@/components/blocks/feature-steps"

const features = [
  { 
    step: '01', 
    title: 'Sign Up',
    content: 'Complete our streamlined registration process in under 2 minutes. No hidden obligations or complex forms—just the information we need to get you started.', 
    image: '/register.png',
    icon: <UserCheck className="h-6 w-6 text-primary-foreground" />,
  },
  { 
    step: '02',
    title: 'Get Verified',
    content: 'Our system instantly verifies your eligibility with no waiting period. Once approved, you\'ll have immediate access to exclusive offers tailored to your profile.',
    image: '/check.png',
    icon: <ShieldCheck className="h-6 w-6 text-primary-foreground" />,
  },
  { 
    step: '03',
    title: 'Get Paid',
    content: 'Start receiving benefits right away. Our clients typically see their first rewards within 24-48 hours of approval—with no complicated redemption process.',
    image: '/money.png', 
    icon: <BadgeCheck className="h-6 w-6 text-primary-foreground" />,
  },
]

export default function HowItWorksSection() {
  return (
    <FeatureSteps 
      features={features}
      title={<>Simple Process, <span className="gradient-text">Exceptional</span> Results</>}
      description="We help you take advantage of exclusive offers from top platforms. No cost, no catch—just sign up and get started."
    />
  )
} 