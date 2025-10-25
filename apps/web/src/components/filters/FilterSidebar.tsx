'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { X, ChevronDown, ChevronUp } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  title: string
  type: 'checkbox' | 'radio'
  options: FilterOption[]
  collapsible?: boolean
}

interface FilterSidebarProps {
  filters: FilterGroup[]
  selectedFilters: Record<string, string[]>
  onFilterChange: (filterId: string, value: string, checked: boolean) => void
  onClearAll: () => void
  className?: string
}

export default function FilterSidebar({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  className = ''
}: FilterSidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0)
  }

  const isGroupCollapsed = (groupId: string) => {
    return collapsedGroups[groupId] || false
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          Filtreler
          {getTotalSelectedCount() > 0 && (
            <Badge variant="secondary" className="rounded-full">
              {getTotalSelectedCount()}
            </Badge>
          )}
        </h3>
        {getTotalSelectedCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Temizle
          </Button>
        )}
      </div>

      <Separator className="mb-4" />

      {/* Filter Groups */}
      <div className="space-y-6">
        {filters.map((group) => {
          const isCollapsed = isGroupCollapsed(group.id)
          const selectedCount = selectedFilters[group.id]?.length || 0

          return (
            <div key={group.id} className="space-y-3">
              {/* Group Header */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => group.collapsible && toggleGroup(group.id)}
                  className="flex items-center gap-2 font-medium text-sm text-gray-900 hover:text-primary transition-colors"
                >
                  <span>{group.title}</span>
                  {selectedCount > 0 && (
                    <Badge variant="outline" className="rounded-full text-xs">
                      {selectedCount}
                    </Badge>
                  )}
                  {group.collapsible && (
                    isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Group Options */}
              {!isCollapsed && (
                <div className="space-y-2 ml-1">
                  {group.type === 'checkbox' ? (
                    // Checkbox group
                    group.options.map((option) => {
                      const isChecked = selectedFilters[group.id]?.includes(option.value) || false
                      
                      return (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${group.id}-${option.value}`}
                            checked={isChecked}
                            onCheckedChange={(checked) => 
                              onFilterChange(group.id, option.value, checked as boolean)
                            }
                          />
                          <Label
                            htmlFor={`${group.id}-${option.value}`}
                            className="text-sm font-normal cursor-pointer flex items-center justify-between flex-1"
                          >
                            <span className="text-gray-700">{option.label}</span>
                            {option.count !== undefined && (
                              <span className="text-xs text-gray-400">
                                ({option.count})
                              </span>
                            )}
                          </Label>
                        </div>
                      )
                    })
                  ) : (
                    // Radio group
                    <RadioGroup
                      value={selectedFilters[group.id]?.[0] || ''}
                      onValueChange={(value) => {
                        // Clear previous selection
                        const previousValue = selectedFilters[group.id]?.[0]
                        if (previousValue) {
                          onFilterChange(group.id, previousValue, false)
                        }
                        // Set new selection
                        onFilterChange(group.id, value, true)
                      }}
                    >
                      {group.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${group.id}-${option.value}`} />
                          <Label
                            htmlFor={`${group.id}-${option.value}`}
                            className="text-sm font-normal cursor-pointer flex items-center justify-between flex-1"
                          >
                            <span className="text-gray-700">{option.label}</span>
                            {option.count !== undefined && (
                              <span className="text-xs text-gray-400">
                                ({option.count})
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              )}

              {/* Separator between groups */}
              {filters.indexOf(group) < filters.length - 1 && (
                <Separator className="mt-4" />
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Filters Tags */}
      {getTotalSelectedCount() > 0 && (
        <div className="mt-6 pt-4 border-t">
          <p className="text-xs font-medium text-gray-600 mb-2">Seçili Filtreler:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([groupId, values]) =>
              values.map((value) => {
                const group = filters.find(g => g.id === groupId)
                const option = group?.options.find(o => o.value === value)
                
                return (
                  <Badge
                    key={`${groupId}-${value}`}
                    variant="secondary"
                    className="pl-2 pr-1 py-1 gap-1 text-xs"
                  >
                    {option?.label}
                    <button
                      onClick={() => onFilterChange(groupId, value, false)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
