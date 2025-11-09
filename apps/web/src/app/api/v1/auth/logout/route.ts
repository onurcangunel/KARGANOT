import { NextRequest } from 'next/server';
import { apiSuccess } from '@/lib/api/response';

export async function POST(req: NextRequest) {
  try {
    // Client-side token silme işlemi için basit response
    // İlerleyen zamanlarda Redis ile token blacklist eklenebilir
    
    return apiSuccess({
      message: 'Çıkış başarılı'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return apiSuccess({
      message: 'Çıkış işlemi tamamlandı'
    });
  }
}
