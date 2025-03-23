import type { FC } from "react"
import Image from "next/image"

interface LogoProps {
  className?: string
  size?: number
}

const Logo: FC<LogoProps> = ({ className, size = 32 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Image
        src="/favicon-196x196.png"
        alt="SB Management Logo"
        width={size}
        height={size}
        className="object-contain"
        priority
      />
    </div>
  )
}

export default Logo

