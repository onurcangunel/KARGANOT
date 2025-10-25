import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
  href?: string
}

export default function Logo({ 
  size = 'md', 
  className = '', 
  showText = true,
  href = '/'
}: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, text: 'text-lg' },
    md: { width: 40, height: 40, text: 'text-xl' },
    lg: { width: 48, height: 48, text: 'text-2xl' }
  }

  const LogoContent = () => (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-10 h-10' : 'w-12 h-12'}`}>
        {/* TODO: Replace with actual KARGANOT logo image */}
        {/* <Image src="/image/logo.png" alt="KARGANOT" fill className="object-contain" /> */}
        
        {/* Temporary gradient placeholder */}
        <div className="w-full h-full bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">🐦</span>
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`font-bold ${sizes[size].text} tracking-tight`}>
          <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            KARGA
          </span>
          <span className="text-secondary">NOT</span>
        </span>
      )}
    </div>
  )

  // If href provided, wrap in Link
  if (href) {
    return (
      <Link href={href} className="hover:opacity-80 transition-opacity">
        <LogoContent />
      </Link>
    )
  }

  return <LogoContent />
}