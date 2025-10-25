// YÖK ATLAS API Integration
// Using YÖK ATLAS MCP Server: https://github.com/saidsurucu/yokatlas-mcp

export interface YokAtlasUniversity {
  universityId: string
  universityName: string
  city: string
  type: string
}

export interface YokAtlasFaculty {
  facultyId: string
  facultyName: string
  universityId: string
}

export interface YokAtlasDepartment {
  programId: string
  programName: string
  facultyName: string
  universityName: string
  city: string
  quota?: number
  minScore?: number
  maxScore?: number
}

class YokAtlasService {
  // ✅ YENİ: Database-backed API (Next.js + Prisma)
  private baseUrl = '/api/yokatlas-proxy'  // Next.js proxy to Python API
  
  // Cache için
  private cache: {
    universities: YokAtlasUniversity[] | null
    faculties: Map<string, YokAtlasFaculty[]>
    departments: Map<string, YokAtlasDepartment[]>
    lastFetch: number
  } = {
    universities: null,
    faculties: new Map<string, YokAtlasFaculty[]>(),
    departments: new Map<string, YokAtlasDepartment[]>(),
    lastFetch: 0
  }

  private cacheTimeout = 24 * 60 * 60 * 1000 // 24 saat

  private isCacheValid(): boolean {
    return Date.now() - this.cache.lastFetch < this.cacheTimeout
  }

  async getAllUniversities(): Promise<YokAtlasUniversity[]> {
    if (this.cache.universities && this.isCacheValid()) {
      console.log('✅ Using cached universities')
      return this.cache.universities
    }

    try {
      console.log('🔄 Fetching universities from Python API...')
      const response = await fetch(`${this.baseUrl}/universities`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch universities: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Universities fetched: ${data.length}`)
      
      this.cache.universities = data
      this.cache.lastFetch = Date.now()
      
      return data
    } catch (error) {
      console.error('❌ YÖK ATLAS API Error:', error)
      return this.getFallbackUniversities()
    }
  }

  async getFacultiesByUniversity(universityId: string, universityName?: string): Promise<YokAtlasFaculty[]> {
    const cacheKey = `${universityId}-${universityName || ''}`
    
    if (this.cache.faculties.has(cacheKey) && this.isCacheValid()) {
      console.log('✅ Using cached faculties for:', universityName)
      return this.cache.faculties.get(cacheKey)!
    }

    try {
      console.log('🔄 Fetching faculties for:', universityName)
      // Python API endpoint
      const url = `${this.baseUrl}/faculties?universityName=${encodeURIComponent(universityName || '')}`
      
      const response = await fetch(url, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch faculties: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Faculties fetched: ${data.length}`)
      
      this.cache.faculties.set(cacheKey, data)
      
      return data
    } catch (error) {
      console.error('❌ YÖK ATLAS API Error:', error)
      return []
    }
  }

  async getDepartmentsByFaculty(facultyId: string, facultyName?: string, universityName?: string): Promise<YokAtlasDepartment[]> {
    const cacheKey = `${facultyId}-${facultyName || ''}`
    
    if (this.cache.departments.has(cacheKey) && this.isCacheValid()) {
      console.log('✅ Using cached departments for:', facultyName)
      return this.cache.departments.get(cacheKey)!
    }

    try {
      console.log('🔄 Fetching departments for:', facultyName, '@', universityName)
      // Python API endpoint - requires both faculty and university name
      const url = `${this.baseUrl}/programs?facultyName=${encodeURIComponent(facultyName || '')}&universityName=${encodeURIComponent(universityName || '')}`
      
      const response = await fetch(url, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch departments: ${response.status}`)
      }

      const data = await response.json()
      console.log(`✅ Departments fetched: ${data.length}`)
      
      this.cache.departments.set(cacheKey, data)
      
      return data
    } catch (error) {
      console.error('❌ YÖK ATLAS API Error:', error)
      return []
    }
  }

  async searchPrograms(query: string): Promise<YokAtlasDepartment[]> {
    try {
      const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error('Failed to search programs')
      }

      return await response.json()
    } catch (error) {
      console.error('YÖK ATLAS API Error:', error)
      return []
    }
  }

  // Fallback data (API çalışmazsa)
  private getFallbackUniversities(): YokAtlasUniversity[] {
    return [
      { universityId: '1', universityName: 'İstanbul Üniversitesi', type: 'Devlet', city: 'İstanbul' },
      { universityId: '2', universityName: 'Orta Doğu Teknik Üniversitesi', type: 'Devlet', city: 'Ankara' },
      { universityId: '3', universityName: 'Boğaziçi Üniversitesi', type: 'Devlet', city: 'İstanbul' },
      { universityId: '4', universityName: 'İstanbul Teknik Üniversitesi', type: 'Devlet', city: 'İstanbul' },
      { universityId: '5', universityName: 'Ankara Üniversitesi', type: 'Devlet', city: 'Ankara' },
      { universityId: '6', universityName: 'Hacettepe Üniversitesi', type: 'Devlet', city: 'Ankara' },
      { universityId: '7', universityName: 'Ege Üniversitesi', type: 'Devlet', city: 'İzmir' },
      { universityId: '8', universityName: 'Gazi Üniversitesi', type: 'Devlet', city: 'Ankara' },
      { universityId: '9', universityName: 'Marmara Üniversitesi', type: 'Devlet', city: 'İstanbul' },
      { universityId: '10', universityName: 'Dokuz Eylül Üniversitesi', type: 'Devlet', city: 'İzmir' },
      { universityId: '11', universityName: 'Koç Üniversitesi', type: 'Vakıf', city: 'İstanbul' },
      { universityId: '12', universityName: 'Sabancı Üniversitesi', type: 'Vakıf', city: 'İstanbul' },
      { universityId: '13', universityName: 'Bilkent Üniversitesi', type: 'Vakıf', city: 'Ankara' }
    ]
  }

  // Cache'i temizle
  clearCache(): void {
    this.cache = {
      universities: null,
      faculties: new Map(),
      departments: new Map(),
      lastFetch: 0
    }
  }
}

// Singleton instance
export const yokAtlasService = new YokAtlasService()

// React Hook for using in components
export function useYokAtlas() {
  return {
    getAllUniversities: () => yokAtlasService.getAllUniversities(),
    getFacultiesByUniversity: (universityId: string) => 
      yokAtlasService.getFacultiesByUniversity(universityId),
    getDepartmentsByFaculty: (facultyId: string) => 
      yokAtlasService.getDepartmentsByFaculty(facultyId),
    searchPrograms: (query: string) => 
      yokAtlasService.searchPrograms(query),
    clearCache: () => yokAtlasService.clearCache()
  }
}