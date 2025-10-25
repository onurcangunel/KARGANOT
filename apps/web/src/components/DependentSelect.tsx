'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, X, Loader2, AlertCircle } from 'lucide-react'

interface SelectOption {
  id: string
  name: string
  [key: string]: any
}

interface DependentSelectProps {
  value: SelectOption | null
  onChange: (option: SelectOption | null) => void
  options: SelectOption[]
  isLoading?: boolean
  error?: string
  placeholder?: string
  disabled?: boolean
  label: string
  required?: boolean
}

export function DependentSelect({
  value,
  onChange,
  options,
  isLoading = false,
  error,
  placeholder = 'Seçin...',
  disabled = false,
  label,
  required = false,
}: DependentSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
          disabled={disabled || isLoading}
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
            ${disabled || isLoading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Yükleniyor...</span>
            </div>
          ) : (
            <span className={value ? 'text-gray-900' : 'text-gray-500'}>
              {value ? value.name : placeholder}
            </span>
          )}

          <div className="flex items-center gap-1">
            {value && !disabled && !isLoading && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onChange(null)
                }}
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

        {/* Dropdown */}
        {isOpen && !isLoading && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
            {options.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-600">Seçenek bulunamadı</div>
            ) : (
              options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option)
                    setIsOpen(false)
                  }}
                  className={`
                    w-full px-4 py-3 text-left hover:bg-blue-50
                    transition-colors duration-150
                    ${value?.id === option.id ? 'bg-blue-100' : ''}
                  `}
                >
                  <div className="font-medium text-gray-900">{option.name}</div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}
