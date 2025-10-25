'use client'

/**
 * YÖK ATLAS Select Component
 * 
 * Cascading selection: University → Unit (Fakülte/MYO) → Department
 * Real-time search with debouncing
 */

import { useState, useEffect, useCallback } from 'react'
import { Search, X, Loader2, Building2, GraduationCap, BookOpen } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'

// Types
interface University {
  id: string
  name: string
  slug: string
  city?: string
  type?: string
  _count?: {
    units: number
  }
}

interface Unit {
  id: string
  name: string
  slug: string
  type: string
  shortName?: string
  university: {
    id: string
    name: string
    city?: string
  }
  _count?: {
    departments: number
  }
}

interface Department {
  id: string
  name: string
  slug: string
  code?: string
  scoreType?: string
  quota?: number
  universityUnit?: {
    id: string
    name: string
    type: string
    university: {
      id: string
      name: string
      city?: string
    }
  }
}

interface Selection {
  university?: University
  unit?: Unit
  department?: Department
}

interface Props {
  value?: Selection
  onChange: (selection: Selection) => void
  required?: boolean
  className?: string
}

// Unit type mapping (Türkçe labels)
const UNIT_TYPE_LABELS: Record<string, string> = {
  FACULTY: 'Fakülte',
  VOCATIONAL_SCHOOL: 'MYO',
  GRADUATE_SCHOOL: 'Enstitü',
  COLLEGE: 'Yüksekokul',
  CONSERVATORY: 'Konservatuar',
  RESEARCH_CENTER: 'Araştırma Merkezi',
  APPLICATION_CENTER: 'Uygulama Merkezi',
  OTHER: 'Diğer',
}

export function YokAtlasSelect({ value, onChange, required, className }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeStep, setActiveStep] = useState<'university' | 'unit' | 'department'>('university')
  const [isLoading, setIsLoading] = useState(false)

  // Results
  const [universities, setUniversities] = useState<University[]>([])
  const [units, setUnits] = useState<Unit[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

  // Selected values
  const [selection, setSelection] = useState<Selection>(value || {})

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300)

  // 1. Search universities
  useEffect(() => {
    if (activeStep !== 'university' || debouncedSearch.length < 2) {
      setUniversities([])
      return
    }

    setIsLoading(true)
    fetch(`/api/yok-atlas/universities?search=${encodeURIComponent(debouncedSearch)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUniversities(data.data)
        }
      })
      .catch((err) => console.error('University search error:', err))
      .finally(() => setIsLoading(false))
  }, [debouncedSearch, activeStep])

  // 2. Load units when university selected
  useEffect(() => {
    if (!selection.university || activeStep !== 'unit') {
      setUnits([])
      return
    }

    setIsLoading(true)
    const searchParam = debouncedSearch.length >= 2 ? `&search=${encodeURIComponent(debouncedSearch)}` : ''
    fetch(`/api/yok-atlas/units?universityId=${selection.university.id}${searchParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUnits(data.data)
        }
      })
      .catch((err) => console.error('Units fetch error:', err))
      .finally(() => setIsLoading(false))
  }, [selection.university, debouncedSearch, activeStep])

  // 3. Load departments when unit selected
  useEffect(() => {
    if (!selection.unit || activeStep !== 'department') {
      setDepartments([])
      return
    }

    setIsLoading(true)
    const searchParam = debouncedSearch.length >= 2 ? `&search=${encodeURIComponent(debouncedSearch)}` : ''
    fetch(`/api/yok-atlas/departments?unitId=${selection.unit.id}${searchParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDepartments(data.data)
        }
      })
      .catch((err) => console.error('Departments fetch error:', err))
      .finally(() => setIsLoading(false))
  }, [selection.unit, debouncedSearch, activeStep])

  // Select university
  const handleSelectUniversity = useCallback((uni: University) => {
    setSelection({ university: uni })
    setSearchQuery('')
    setActiveStep('unit')
  }, [])

  // Select unit
  const handleSelectUnit = useCallback((unit: Unit) => {
    setSelection((prev) => ({ ...prev, unit }))
    setSearchQuery('')
    setActiveStep('department')
  }, [])

  // Select department
  const handleSelectDepartment = useCallback(
    (dept: Department) => {
      const finalSelection = { ...selection, department: dept }
      setSelection(finalSelection)
      onChange(finalSelection)
      setIsOpen(false)
      setSearchQuery('')
    },
    [selection, onChange]
  )

  // Reset selection
  const handleReset = useCallback(() => {
    setSelection({})
    setSearchQuery('')
    setActiveStep('university')
    onChange({})
  }, [onChange])

  // Display text for input
  const getDisplayText = (): string => {
    if (selection.department) {
      return `${selection.university?.name} → ${selection.unit?.shortName || selection.unit?.name} → ${selection.department.name}`
    }
    if (selection.unit) {
      return `${selection.university?.name} → ${selection.unit?.shortName || selection.unit?.name}`
    }
    if (selection.university) {
      return selection.university.name
    }
    return ''
  }

  return (
    <div className={`relative ${className}`}>
      {/* Input Field */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={isOpen ? searchQuery : getDisplayText()}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            if (!isOpen) setIsOpen(true)
          }}
          onFocus={() => {
            setIsOpen(true)
            setSearchQuery('')
          }}
          placeholder={
            activeStep === 'university'
              ? 'Üniversite ara (örn: Muğla, Boğaziçi, ODTÜ)'
              : activeStep === 'unit'
              ? 'Fakülte veya MYO ara'
              : 'Bölüm ara'
          }
          required={required}
          className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
        )}

        {/* Clear button */}
        {(searchQuery || getDisplayText()) && (
          <button
            type="button"
            onClick={handleReset}
            className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 transition-colors"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Breadcrumb Steps */}
      {selection.university && (
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 flex-wrap">
          <button
            type="button"
            onClick={() => {
              setSelection({ university: selection.university })
              setActiveStep('unit')
              setIsOpen(true)
            }}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <Building2 className="h-4 w-4" />
            {selection.university.name}
          </button>

          {selection.unit && (
            <>
              <span>→</span>
              <button
                type="button"
                onClick={() => {
                  setSelection({ university: selection.university, unit: selection.unit })
                  setActiveStep('department')
                  setIsOpen(true)
                }}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                <GraduationCap className="h-4 w-4" />
                {selection.unit.shortName || selection.unit.name}
              </button>
            </>
          )}

          {selection.department && (
            <>
              <span>→</span>
              <span className="flex items-center gap-1 text-blue-600 font-medium">
                <BookOpen className="h-4 w-4" />
                {selection.department.name}
              </span>
            </>
          )}
        </div>
      )}

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {/* Universities */}
          {activeStep === 'university' && universities.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase">
                Üniversiteler ({universities.length})
              </div>
              {universities.map((uni) => (
                <button
                  key={uni.id}
                  type="button"
                  onClick={() => handleSelectUniversity(uni)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-sm">{uni.name}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <span>{uni.city || 'Türkiye'}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                      {uni.type || 'Devlet'}
                    </span>
                    {uni._count && uni._count.units > 0 && (
                      <>
                        <span>•</span>
                        <span>{uni._count.units} birim</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Units */}
          {activeStep === 'unit' && units.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase">
                Birimler ({units.length})
              </div>
              {units.map((unit) => (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => handleSelectUnit(unit)}
                  className="w-full px-4 py-3 text-left hover:bg-green-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-sm">{unit.name}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                      {UNIT_TYPE_LABELS[unit.type] || unit.type}
                    </span>
                    {unit._count && unit._count.departments > 0 && (
                      <>
                        <span>•</span>
                        <span>{unit._count.departments} bölüm</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Departments */}
          {activeStep === 'department' && departments.length > 0 && (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b text-xs font-semibold text-gray-600 uppercase">
                Bölümler ({departments.length})
              </div>
              {departments.map((dept) => (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => handleSelectDepartment(dept)}
                  className="w-full px-4 py-3 text-left hover:bg-purple-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="font-medium text-sm">{dept.name}</div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                    {dept.scoreType && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                        {dept.scoreType}
                      </span>
                    )}
                    {dept.quota && (
                      <>
                        <span>•</span>
                        <span>Kontenjan: {dept.quota}</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading &&
            ((activeStep === 'university' && universities.length === 0 && searchQuery.length >= 2) ||
              (activeStep === 'unit' && units.length === 0 && selection.university) ||
              (activeStep === 'department' && departments.length === 0 && selection.unit)) && (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="text-sm">Sonuç bulunamadı</div>
                {searchQuery.length >= 2 && (
                  <div className="text-xs mt-1">"{searchQuery}" için sonuç yok</div>
                )}
              </div>
            )}

          {/* Initial state */}
          {!isLoading &&
            activeStep === 'university' &&
            universities.length === 0 &&
            searchQuery.length < 2 && (
              <div className="px-4 py-8 text-center text-gray-500">
                <div className="text-sm">Aramaya başlayın</div>
                <div className="text-xs mt-1">En az 2 karakter girin (örn: "Muğla", "ODTÜ")</div>
              </div>
            )}
        </div>
      )}
    </div>
  )
}
