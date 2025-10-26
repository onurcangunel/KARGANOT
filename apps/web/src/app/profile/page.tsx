'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppLayout from '@/components/AppLayout'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('karganot_user')
    if (!userStr) {
      router.push('/simple-login')
    } else {
      setUser(JSON.parse(userStr))
    }
  }, [router])

  if (!user) return null

  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Profilim</h1>
        
        <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ad Soyad
              </label>
              <p className="text-lg">{user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-posta
              </label>
              <p className="text-lg">{user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Üyelik Durumu
              </label>
              <p className="text-lg">Ücretsiz</p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
