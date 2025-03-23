import { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        silver: "hsl(var(--silver))",
        neutral: "hsl(var(--neutral))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      fontSize: {
        "2xs": ".6875rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(180deg, hsl(222, 47%, 11%) 0%, hsl(222, 35%, 8%) 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.03) 100%)",
        "button-gradient": "linear-gradient(135deg, #9ca3af 0%, #b3c2cc 100%)",
        "accent-gradient": "linear-gradient(135deg, hsl(var(--silver)) 0%, hsl(var(--accent)) 100%)",
        "shine-gradient": "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
        "cta-gradient": "linear-gradient(135deg, hsl(215, 25%, 70%) 0%, hsl(205, 40%, 80%) 100%)",
        "glow-gradient": "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
      },
      transitionProperty: {
        height: "height",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        appear: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "star-movement-bottom": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50px, -50px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "0.8", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ping-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.2)", opacity: "0" },
        },
        "subtle-float": {
          "0%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(-5px) translateX(5px)" },
          "50%": { transform: "translateY(5px) translateX(10px)" },
          "75%": { transform: "translateY(10px) translateX(5px)" },
          "100%": { transform: "translateY(0) translateX(0)" },
        },
        "button-glow": {
          "0%": { boxShadow: "0 0 5px 0 rgba(255, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 20px 0 rgba(255, 255, 255, 0.5)" },
          "100%": { boxShadow: "0 0 5px 0 rgba(255, 255, 255, 0.3)" },
        },
        "cta-pulse": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" },
          "100%": { transform: "scale(1)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "text-reveal": {
          "0%": { clipPath: "inset(0 100% 0 0)" },
          "100%": { clipPath: "inset(0 0 0 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        appear: "appear 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "star-movement-bottom": "star-movement-bottom 60s linear infinite alternate",
        "star-movement-top": "star-movement-top 60s linear infinite alternate",
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-left": "fade-in-left 0.7s ease-out",
        "fade-in-right": "fade-in-right 0.7s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "subtle-float": "subtle-float 8s ease-in-out infinite",
        "button-glow": "button-glow 2s ease-in-out infinite",
        "cta-pulse": "cta-pulse 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 12s linear infinite",
        "text-reveal": "text-reveal 0.8s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

