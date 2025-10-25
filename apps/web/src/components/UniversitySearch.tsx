'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Building2, MapPin, ChevronDown } from 'lucide-react';

interface UniversitySearchResult {
  universityId: string;
  universityName: string;
  city: string;
  unitId: string | null;
  unitName: string | null;
  unitType: string | null;
}

interface UniversitySearchValue {
  universityId: string;
  universityName: string;
  unitId?: string;
  unitName?: string;
  unitType?: string;
  city?: string;
}

interface UniversitySearchProps {
  value?: UniversitySearchValue | null;
  onChange: (value: UniversitySearchValue | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const UNIT_TYPE_LABELS: Record<string, string> = {
  FACULTY: 'Fakülte',
  VOCATIONAL_SCHOOL: 'MYO',
  GRADUATE_SCHOOL: 'Enstitü',
  COLLEGE: 'Yüksekokul',
  CONSERVATORY: 'Konservatuar',
  RESEARCH_CENTER: 'Araştırma Merkezi',
  APPLICATION_CENTER: 'Uygulama Merkezi',
  OTHER: 'Diğer',
};

const UNIT_TYPE_COLORS: Record<string, string> = {
  FACULTY: 'bg-blue-100 text-blue-700',
  VOCATIONAL_SCHOOL: 'bg-green-100 text-green-700',
  GRADUATE_SCHOOL: 'bg-purple-100 text-purple-700',
  COLLEGE: 'bg-yellow-100 text-yellow-700',
  CONSERVATORY: 'bg-pink-100 text-pink-700',
  RESEARCH_CENTER: 'bg-indigo-100 text-indigo-700',
  APPLICATION_CENTER: 'bg-orange-100 text-orange-700',
  OTHER: 'bg-gray-100 text-gray-700',
};

export function UniversitySearch({
  value,
  onChange,
  placeholder = 'Üniversite veya birim ara (örn: "muğla", "yatağan myo")',
  disabled = false,
  error,
}: UniversitySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<UniversitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer (300ms debounce)
    debounceTimerRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search/universities?q=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setIsOpen(true);
        return;
      }
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery('');
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelect = (result: UniversitySearchResult) => {
    onChange({
      universityId: result.universityId,
      universityName: result.universityName,
      unitId: result.unitId || undefined,
      unitName: result.unitName || undefined,
      unitType: result.unitType || undefined,
      city: result.city,
    });
    setIsOpen(false);
    setSearchQuery('');
    setSelectedIndex(-1);
  };

  const handleClear = () => {
    onChange(null);
    setSearchQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Display text
  const displayText = useMemo(() => {
    if (!value) return '';
    if (value.unitName) {
      return `${value.universityName} - ${value.unitName}`;
    }
    return value.universityName;
  }, [value]);

  return (
    <div ref={containerRef} className="relative">
      {/* Input Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchQuery : displayText}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full pl-10 pr-10 py-2.5 border rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-gray-300'}
          `}
        />

        {value && !isOpen && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}

        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Current Selection Display */}
      {value && !isOpen && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Building2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{value.universityName}</p>
              {value.city && (
                <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />
                  {value.city}
                </p>
              )}
              {value.unitName && (
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`
                      inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${UNIT_TYPE_COLORS[value.unitType || 'OTHER'] || 'bg-gray-100 text-gray-700'}
                    `}
                  >
                    {UNIT_TYPE_LABELS[value.unitType || 'OTHER'] || 'Birim'}
                  </span>
                  <span className="text-sm text-gray-700">{value.unitName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
              Aranıyor...
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {searchQuery.length < 2 ? (
                <p>En az 2 karakter girin</p>
              ) : (
                <p>Sonuç bulunamadı</p>
              )}
            </div>
          ) : (
            <div className="py-1">
              {results.map((result, index) => (
                <button
                  key={`${result.universityId}-${result.unitId || 'main'}`}
                  type="button"
                  onClick={() => handleSelect(result)}
                  className={`
                    w-full text-left px-4 py-3 hover:bg-gray-50
                    transition-colors duration-150
                    ${index === selectedIndex ? 'bg-blue-50' : ''}
                    ${index !== results.length - 1 ? 'border-b border-gray-100' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {result.universityName}
                      </p>
                      {result.city && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" />
                          {result.city}
                        </p>
                      )}
                      {result.unitName && (
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`
                              inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                              ${UNIT_TYPE_COLORS[result.unitType || 'OTHER'] || 'bg-gray-100 text-gray-700'}
                            `}
                          >
                            {UNIT_TYPE_LABELS[result.unitType || 'OTHER'] || 'Birim'}
                          </span>
                          <span className="text-sm text-gray-700 truncate">{result.unitName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
