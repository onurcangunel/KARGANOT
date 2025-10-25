import { z } from 'zod';

/**
 * REGISTER VALIDATION SCHEMA
 * Kullanıcı kayıt formu için validasyon kuralları
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'İsim sadece harf içerebilir'),
  
  email: z
    .string()
    .email('Geçerli bir email adresi giriniz')
    .toLowerCase()
    .refine(
      (email) => {
        // Türk üniversite maili kontrolü (opsiyonel)
        const eduTrDomains = ['.edu.tr', '@stu.', '@ogrenci.', '@ogr.'];
        // İlk aşamada tüm emailleri kabul et
        return true; // eduTrDomains.some(domain => email.includes(domain));
      },
      { message: 'Lütfen üniversite mail adresinizi kullanın (.edu.tr)' }
    ),
  
  password: z
    .string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .max(100, 'Şifre çok uzun')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir'
    ),
  
  confirmPassword: z.string(),
  
  // Academic Info (opsiyonel)
  university: z.string().optional(),
  faculty: z.string().optional(),
  department: z.string().optional(),
  
  // Terms acceptance
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Kullanım koşullarını kabul etmelisiniz',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword'],
});

/**
 * LOGIN VALIDATION SCHEMA
 * Kullanıcı giriş formu için validasyon kuralları
 */
export const loginSchema = z.object({
  email: z
    .string()
    .email('Geçerli bir email adresi giriniz')
    .toLowerCase(),
  
  password: z
    .string()
    .min(1, 'Şifre gereklidir'),
  
  remember: z.boolean().optional(),
});

/**
 * PROFILE UPDATE VALIDATION SCHEMA
 * Profil güncelleme için validasyon kuralları
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(50, 'İsim en fazla 50 karakter olabilir')
    .optional(),
  
  image: z.string().url('Geçerli bir URL giriniz').optional(),
  
  university: z.string().optional(),
  faculty: z.string().optional(),
  department: z.string().optional(),
  studentId: z.string().optional(),
  gradeLevel: z.number().min(1).max(6).optional(),
});

/**
 * PASSWORD CHANGE VALIDATION SCHEMA
 * Şifre değiştirme için validasyon kuralları
 */
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Mevcut şifre gereklidir'),
  
  newPassword: z
    .string()
    .min(8, 'Yeni şifre en az 8 karakter olmalıdır')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Şifre en az 1 büyük harf, 1 küçük harf ve 1 rakam içermelidir'
    ),
  
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: 'Yeni şifreler eşleşmiyor',
  path: ['confirmNewPassword'],
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
