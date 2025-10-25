'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, ChevronDown, X, Loader2, AlertCircle } from 'lucide-react'

// University type
export interface University {
  id: string
  name: string
  slug: string
  city?: string | null
  type?: string | null
  logo?: string | null
}

// Props interface
interface UniversitySelectProps {
  value: University | null
  onChange: (university: University | null) => void
  placeholder?: string
  disabled?: boolean
  error?: string
}

export function UniversitySelect({
  value,
  onChange,
  placeholder = 'Üniversite seçin...',
  disabled = false,
  error,
}: UniversitySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [universities, setUniversities] = useState<University[]>([])
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)

  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Fetch universities on mount
  useEffect(() => {
    fetchUniversities()
  }, [])

  // Filter universities based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredUniversities(universities)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = universities.filter(
      (uni) =>
        uni.name.toLowerCase().includes(query) ||
        uni.slug.toLowerCase().includes(query) ||
        uni.city?.toLowerCase().includes(query)
    )
    setFilteredUniversities(filtered)
    setFocusedIndex(-1)
  }, [searchQuery, universities])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Fetch universities from API
  const fetchUniversities = async () => {
    setIsLoading(true)
    setLoadError(null)

    try {
      const response = await fetch('/api/universities?limit=1000')
      
      if (!response.ok) {
        throw new Error('Üniversiteler yüklenirken hata oluştu')
      }

      const data = await response.json()
      setUniversities(data.universities || [])
      setFilteredUniversities(data.universities || [])
    } catch (err) {
      console.error('Failed to fetch universities:', err)
      setLoadError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle university selection
  const handleSelect = (university: University) => {
    onChange(university)
    setIsOpen(false)
    setSearchQuery('')
    setFocusedIndex(-1)
  }

  // Handle clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setSearchQuery('')
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false)
        setSearchQuery('')
        setFocusedIndex(-1)
        break

      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex((prev) =>
          prev < filteredUniversities.length - 1 ? prev + 1 : prev
        )
        break

      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break

      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && filteredUniversities[focusedIndex]) {
          handleSelect(filteredUniversities[focusedIndex])
        }
        break
    }
  }

  // Scroll focused item into view
  useEffect(() => {
    if (focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.querySelector(
        `[data-index="${focusedIndex}"]`
      )
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [focusedIndex])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          w-full px-4 py-2.5 text-left border rounded-lg
          flex items-center justify-between gap-2
          transition-colors duration-200
          ${
            error
              ? 'border-red-300 bg-red-50'
              : isOpen
              ? 'border-blue-500 ring-2 ring-blue-200'
              : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}
        `}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {value ? value.name : placeholder}
        </span>

        <div className="flex items-center gap-1">
          {value && !disabled && (
            <button
              onClick={handleClear}
              className="p-0.5 hover:bg-gray-200 rounded transition-colors"
              title="Temizle"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Üniversite ara..."
                className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Universities List */}
          <div className="max-h-64 overflow-y-auto">
            {isLoading ? (
              // Loading State
              <div className="p-8 text-center">
                <Loader2 className="w-8 h-8 mx-auto mb-2 text-blue-600 animate-spin" />
                <p className="text-sm text-gray-600">Yükleniyor...</p>
              </div>
            ) : loadError ? (
              // Error State
              <div className="p-8 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="text-sm text-red-600 mb-3">{loadError}</p>
                <button
                  onClick={fetchUniversities}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Tekrar dene
                </button>
              </div>
            ) : filteredUniversities.length === 0 ? (
              // No Results
              <div className="p-8 text-center">
                <p className="text-sm text-gray-600">Sonuç bulunamadı</p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    Aramayı temizle
                  </button>
                )}
              </div>
            ) : (
              // Universities List
              filteredUniversities.map((university, index) => (
                <button
                  key={university.id}
                  data-index={index}
                  onClick={() => handleSelect(university)}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-blue-50
                    transition-colors duration-150
                    ${focusedIndex === index ? 'bg-blue-50' : ''}
                    ${value?.id === university.id ? 'bg-blue-100' : ''}
                  `}
                >
                  <div className="font-medium text-gray-900">{university.name}</div>
                  {university.city && (
                    <div className="text-sm text-gray-500 mt-0.5">{university.city}</div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
