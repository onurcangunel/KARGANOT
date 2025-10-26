'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkSession } from '@/lib/helpers'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Giriş yapmış kullanıcıları home'a, yapmamışları login'e yönlendir
    if (checkSession()) {
      router.push('/home')
    } else {
      router.push('/simple-login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Yönlendiriliyorsunuz...</p>
      </div>
    </div>
  )
}
