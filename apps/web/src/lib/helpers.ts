// Notification System
export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export function showNotification(message: string, type: NotificationType = 'info') {
  // Check if we're in browser
  if (typeof window === 'undefined') return

  // Remove existing notifications
  const existing = document.querySelector('.karganot-notification')
  if (existing) existing.remove()

  const notification = document.createElement('div')
  notification.className = `karganot-notification karganot-notification-${type}`
  notification.innerHTML = `
    <div class="karganot-notification-content">
      <span class="karganot-notification-icon">
        ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
      </span>
      <span class="karganot-notification-message">${message}</span>
      <button class="karganot-notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `
  
  // Add styles if not exist
  if (!document.querySelector('#karganot-notification-styles')) {
    const style = document.createElement('style')
    style.id = 'karganot-notification-styles'
    style.textContent = `
      .karganot-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 300px;
        max-width: 500px;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      .karganot-notification-success {
        background: #10b981;
        color: white;
      }
      
      .karganot-notification-error {
        background: #ef4444;
        color: white;
      }
      
      .karganot-notification-warning {
        background: #f59e0b;
        color: white;
      }
      
      .karganot-notification-info {
        background: #3b82f6;
        color: white;
      }
      
      .karganot-notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .karganot-notification-icon {
        font-size: 20px;
        font-weight: bold;
      }
      
      .karganot-notification-message {
        flex: 1;
      }
      
      .karganot-notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
      }
      
      .karganot-notification-close:hover {
        opacity: 1;
      }
    `
    document.head.appendChild(style)
  }
  
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.remove()
  }, 5000)
}

// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Form validation
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  
  if (password.length < 8) {
    errors.push('Şifre en az 8 karakter olmalıdır')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Şifre en az bir büyük harf içermelidir')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Şifre en az bir küçük harf içermelidir')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Şifre en az bir rakam içermelidir')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Session management
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours

export function checkSession(): boolean {
  if (typeof window === 'undefined') return false
  
  const loginTime = localStorage.getItem('karganot_login_time')
  const user = localStorage.getItem('karganot_user')
  
  if (!user) return false
  
  if (loginTime && (Date.now() - parseInt(loginTime)) > SESSION_TIMEOUT) {
    logout()
    showNotification('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.', 'warning')
    return false
  }
  
  return true
}

export function login(userData: any) {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('karganot_user', JSON.stringify(userData))
  localStorage.setItem('karganot_login_time', Date.now().toString())
}

export function logout() {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('karganot_user')
  localStorage.removeItem('karganot_login_time')
}

export function getUser() {
  if (typeof window === 'undefined') return null
  
  const userStr = localStorage.getItem('karganot_user')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

// File validation
export function validateFile(file: File, allowedTypes: string[], maxSize: number = 10 * 1024 * 1024): {
  isValid: boolean
  error?: string
} {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Geçersiz dosya türü. İzin verilen türler: ' + allowedTypes.join(', ')
    }
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `Dosya boyutu çok büyük. Maksimum: ${(maxSize / 1024 / 1024).toFixed(0)}MB`
    }
  }
  
  return { isValid: true }
}

// Loading state
export function setLoading(element: HTMLElement, loading: boolean) {
  if (loading) {
    element.classList.add('loading')
    element.setAttribute('disabled', 'true')
  } else {
    element.classList.remove('loading')
    element.removeAttribute('disabled')
  }
}

// Sanitize input (basic XSS protection)
export function sanitizeInput(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  const reg = /[&<>"'/]/ig
  return input.replace(reg, (match) => map[match])
}
