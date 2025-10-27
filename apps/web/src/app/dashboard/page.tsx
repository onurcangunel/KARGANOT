'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkSession } from '@/lib/helpers'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const router = useRouter()
  
  useEffect(() => {
    if (!checkSession()) {
      router.push('/simple-login')
    } else {
      router.push('/')
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
