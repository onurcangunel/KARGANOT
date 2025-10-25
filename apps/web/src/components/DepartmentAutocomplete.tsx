'use client';

import { useState, useEffect } from 'react';
import { useDepartments } from '@/hooks/useYokAtlas';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Loader2, GraduationCap, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DepartmentAutocompleteProps {
  universityName: string | null;
  facultyName: string | null;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function DepartmentAutocomplete({
  universityName,
  facultyName,
  value,
  onChange,
  placeholder = 'Bölüm seçin...',
  className,
}: DepartmentAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: departments, isLoading } = useDepartments(universityName, facultyName);

  // Fakülte değiştiğinde seçimi temizle
  useEffect(() => {
    if (value && facultyName) {
      onChange('');
    }
  }, [facultyName]);

  const filteredDepartments = departments?.filter(d =>
    d.programName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const selectedDepartment = departments?.find(d => d.programName === value);

  if (!universityName || !facultyName) {
    return (
      <Button
        variant="outline"
        disabled
        className={cn('w-full justify-between', className)}
      >
        <span className="text-muted-foreground">
          {!universityName ? 'Önce üniversite seçin' : 'Önce fakülte seçin'}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedDepartment ? (
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="font-medium">{selectedDepartment.programName}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
          ) : (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[550px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Bölüm ara..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList className="max-h-[400px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredDepartments.length === 0 ? (
              <CommandEmpty>
                {searchQuery
                  ? 'Bölüm bulunamadı.'
                  : 'Bu fakülteye ait bölüm bulunamadı.'}
              </CommandEmpty>
            ) : (
              <CommandGroup heading={`${filteredDepartments.length} bölüm`}>
                {filteredDepartments.map((department) => (
                  <CommandItem
                    key={department.programId}
                    value={department.programName}
                    onSelect={(currentValue: string) => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                      setSearchQuery('');
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === department.programName ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{department.programName}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {department.scoreType && (
                          <>
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              {department.scoreType}
                            </span>
                            <span>•</span>
                          </>
                        )}
                        {department.quota && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Kontenjan: {department.quota}
                          </span>
                        )}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
