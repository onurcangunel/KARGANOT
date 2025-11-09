'use client';

import { useState, useEffect } from 'react';
import { useFaculties } from '@/hooks/useYokAtlas';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Loader2, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FacultyAutocompleteProps {
  universityName: string | null;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function FacultyAutocomplete({
  universityName,
  value,
  onChange,
  placeholder = 'Fakülte seçin...',
  className,
}: FacultyAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: faculties, isLoading } = useFaculties(universityName);

  // Üniversite değiştiğinde seçimi temizle
  useEffect(() => {
    if (value && universityName) {
      onChange('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universityName]);

  const filteredFaculties = faculties?.filter(f =>
    f.facultyName.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const selectedFaculty = faculties?.find(f => f.facultyName === value);

  if (!universityName) {
    return (
      <Button
        variant="outline"
        disabled
        className={cn('w-full justify-between', className)}
      >
        <span className="text-muted-foreground">Önce üniversite seçin</span>
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
          {selectedFaculty ? (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{selectedFaculty.facultyName}</span>
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
      <PopoverContent className="w-[500px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Fakülte ara..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredFaculties.length === 0 ? (
              <CommandEmpty>
                {searchQuery
                  ? 'Fakülte bulunamadı.'
                  : 'Bu üniversiteye ait fakülte bulunamadı.'}
              </CommandEmpty>
            ) : (
              <CommandGroup heading={`${filteredFaculties.length} fakülte`}>
                {filteredFaculties.map((faculty) => (
                  <CommandItem
                    key={faculty.facultyId}
                    value={faculty.facultyName}
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
                        value === faculty.facultyName ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{faculty.facultyName}</div>
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
