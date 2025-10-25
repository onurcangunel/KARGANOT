import { z } from 'zod'

// Document Types (matching Prisma enum)
export const documentTypes = [
  'DERS_NOTU',
  'OZET',
  'SLAYT',
  'ODEV',
  'SINAV',
  'KILAVUZ',
  'PROJE',
  'LAB',
] as const

export const documentTypeLabels: Record<typeof documentTypes[number], string> = {
  DERS_NOTU: 'Ders Notu',
  OZET: 'Özet',
  SLAYT: 'Slayt/Sunum',
  ODEV: 'Ödev',
  SINAV: 'Sınav',
  KILAVUZ: 'Kılavuz',
  PROJE: 'Proje',
  LAB: 'Laboratuvar',
}

// Semesters
export const semesters = ['GUZ', 'BAHAR', 'YAZ'] as const

export const semesterLabels: Record<typeof semesters[number], string> = {
  GUZ: 'Güz',
  BAHAR: 'Bahar',
  YAZ: 'Yaz',
}

// Languages
export const languages = ['TR', 'EN'] as const

export const languageLabels: Record<typeof languages[number], string> = {
  TR: 'Türkçe',
  EN: 'İngilizce',
}

// File validation constants
export const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB in bytes
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
  'image/jpeg',
  'image/png',
]

// Upload form validation schema
export const uploadFormSchema = z.object({
  // File (validated separately in component)
  file: z.custom<File>((file) => file instanceof File, {
    message: 'Dosya seçmelisiniz',
  })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `Dosya boyutu maksimum 50MB olabilir`,
    })
    .refine((file) => ALLOWED_FILE_TYPES.includes(file.type), {
      message: 'Geçersiz dosya tipi. Sadece PDF, DOCX, PPTX, JPG ve PNG kabul edilir.',
    }),

  // Basic Info
  title: z
    .string()
    .min(10, 'Başlık en az 10 karakter olmalıdır')
    .max(200, 'Başlık en fazla 200 karakter olabilir')
    .trim(),

  description: z
    .string()
    .min(50, 'Açıklama en az 50 karakter olmalıdır')
    .max(2000, 'Açıklama en fazla 2000 karakter olabilir')
    .trim(),

  // Academic Info (Required)
  universityId: z
    .string()
    .min(1, 'Üniversite seçmelisiniz'),

  facultyId: z
    .string()
    .min(1, 'Fakülte seçmelisiniz'),

  departmentId: z
    .string()
    .min(1, 'Bölüm seçmelisiniz'),

  courseId: z
    .string()
    .optional()
    .nullable(),

  // Document Details
  documentType: z.enum(documentTypes, {
    errorMap: () => ({ message: 'Geçerli bir içerik türü seçmelisiniz' }),
  }),

  semester: z
    .enum(semesters)
    .optional()
    .nullable(),

  academicYear: z
    .string()
    .regex(/^\d{4}-\d{4}$/, 'Akademik yıl formatı: 2024-2025')
    .optional()
    .nullable(),

  tags: z
    .array(z.string().min(1).max(50))
    .max(10, 'En fazla 10 etiket ekleyebilirsiniz')
    .default([]),

  language: z
    .enum(languages)
    .default('TR'),

  // Optional metadata
  pageCount: z
    .number()
    .int()
    .positive()
    .optional()
    .nullable(),

  professor: z
    .string()
    .max(100)
    .optional()
    .nullable(),
})

// Type inference from schema
export type UploadFormData = z.infer<typeof uploadFormSchema>

// Partial schema for draft saving (all fields optional except file)
export const uploadDraftSchema = uploadFormSchema.partial().extend({
  file: uploadFormSchema.shape.file.optional(),
})

export type UploadDraftData = z.infer<typeof uploadDraftSchema>
