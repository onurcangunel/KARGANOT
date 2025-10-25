/**
 * Format bytes to human-readable file size
 * @param bytes - File size in bytes
 * @returns Formatted string (e.g., "12.5 MB")
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

/**
 * Generate current academic year (e.g., "2024-2025")
 * @returns Current academic year string
 */
export function getCurrentAcademicYear(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 1-12

  // If before September, use previous year
  if (month < 9) {
    return `${year - 1}-${year}`
  }
  return `${year}-${year + 1}`
}

/**
 * Generate academic year options (current + past 5 years)
 * @returns Array of academic year strings
 */
export function getAcademicYearOptions(): string[] {
  const currentYear = new Date().getFullYear()
  const years: string[] = []

  for (let i = 0; i < 6; i++) {
    const startYear = currentYear - i
    years.push(`${startYear}-${startYear + 1}`)
  }

  return years
}

/**
 * Sanitize filename: remove special characters, limit length
 * @param filename - Original filename
 * @returns Sanitized filename
 */
export function sanitizeFileName(filename: string): string {
  // Get extension
  const lastDot = filename.lastIndexOf('.')
  const name = lastDot !== -1 ? filename.slice(0, lastDot) : filename
  const ext = lastDot !== -1 ? filename.slice(lastDot) : ''

  // Remove special characters, keep alphanumeric, dash, underscore
  let sanitized = name
    .replace(/[^a-zA-Z0-9\-_\s]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

  // Limit length (max 50 chars + extension)
  if (sanitized.length > 50) {
    sanitized = sanitized.slice(0, 50)
  }

  return sanitized + ext
}

/**
 * Generate unique filename with timestamp
 * @param originalName - Original filename
 * @returns Unique filename with timestamp
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  const sanitized = sanitizeFileName(originalName)
  
  const lastDot = sanitized.lastIndexOf('.')
  const name = lastDot !== -1 ? sanitized.slice(0, lastDot) : sanitized
  const ext = lastDot !== -1 ? sanitized.slice(lastDot) : ''

  return `${timestamp}-${random}-${name}${ext}`
}

/**
 * Create URL-friendly slug from Turkish text
 * @param text - Text to slugify
 * @returns URL-friendly slug
 */
export function createSlug(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  }

  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Calculate upload speed and ETA
 * @param uploadedBytes - Bytes uploaded so far
 * @param totalBytes - Total file size in bytes
 * @param elapsedTime - Time elapsed in seconds
 * @returns Object with speed (MB/s) and ETA (seconds)
 */
export function calculateUploadStats(
  uploadedBytes: number,
  totalBytes: number,
  elapsedTime: number
): { speed: number; eta: number; uploadedMB: number; totalMB: number } {
  const uploadedMB = uploadedBytes / (1024 * 1024)
  const totalMB = totalBytes / (1024 * 1024)
  const speed = elapsedTime > 0 ? uploadedMB / elapsedTime : 0
  const remainingMB = totalMB - uploadedMB
  const eta = speed > 0 ? remainingMB / speed : 0

  return {
    speed: parseFloat(speed.toFixed(2)),
    eta: Math.round(eta),
    uploadedMB: parseFloat(uploadedMB.toFixed(2)),
    totalMB: parseFloat(totalMB.toFixed(2)),
  }
}

/**
 * Format time in seconds to readable string
 * @param seconds - Time in seconds
 * @returns Formatted time string (e.g., "2m 30s")
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const minutes = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${minutes}m ${secs}s`
}

/**
 * Validate file type
 * @param file - File object
 * @param allowedTypes - Array of allowed MIME types
 * @returns True if valid, false otherwise
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

/**
 * Validate file size
 * @param file - File object
 * @param maxSize - Maximum size in bytes
 * @returns True if valid, false otherwise
 */
export function isValidFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}

/**
 * Get file extension from filename
 * @param filename - Filename with extension
 * @returns Extension (e.g., ".pdf")
 */
export function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.')
  return lastDot !== -1 ? filename.slice(lastDot) : ''
}

/**
 * Get file type label from MIME type
 * @param mimeType - MIME type string
 * @returns Human-readable file type
 */
export function getFileTypeLabel(mimeType: string): string {
  const typeMap: Record<string, string> = {
    'application/pdf': 'PDF',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PowerPoint',
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
  }

  return typeMap[mimeType] || 'Bilinmeyen'
}
