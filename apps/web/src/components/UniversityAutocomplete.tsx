'use client';

import { useState, useCallback, useEffect } from 'react';
import { useUniversities, useYokAtlasSearch } from '@/hooks/useYokAtlas';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, Loader2, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UniversityAutocompleteProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function UniversityAutocomplete({
  value,
  onChange,
  placeholder = 'Üniversite seçin...',
  className,
}: UniversityAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // İlk yüklemede tüm üniversiteleri getir
  const { data: allUniversities, isLoading: isLoadingAll } = useUniversities();

  // Arama sorgusu varsa, YÖK Atlas'ta ara
  const { data: searchResults, isLoading: isSearching } = useYokAtlasSearch(
    debouncedQuery,
    'university',
    debouncedQuery.length >= 2
  );

  // Gösterilecek üniversiteler
  const universities = debouncedQuery.length >= 2 && searchResults
    ? searchResults.map(r => ({
        universityId: r.programId || r.universityId,
        universityName: r.universityName,
        city: r.city,
        type: r.type,
      }))
    : allUniversities || [];

  // Duplicate'leri kaldır
  const uniqueUniversities = universities.filter(
    (uni, index, self) =>
      index === self.findIndex(u => u.universityName === uni.universityName)
  );

  const isLoading = isLoadingAll || isSearching;

  const selectedUniversity = uniqueUniversities.find(
    u => u.universityName === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedUniversity ? (
            <div className="flex items-center gap-2">
              <span className="font-medium">{selectedUniversity.universityName}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {selectedUniversity.city}
              </span>
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
            placeholder="Üniversite ara (örn: Muğla, ODTÜ, İTÜ)..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : uniqueUniversities.length === 0 ? (
              <CommandEmpty>
                {searchQuery
                  ? 'Üniversite bulunamadı. Farklı bir anahtar kelime deneyin.'
                  : 'Üniversite listesi yükleniyor...'}
              </CommandEmpty>
            ) : (
              <CommandGroup heading={`${uniqueUniversities.length} üniversite`}>
                {uniqueUniversities.map((university) => (
                  <CommandItem
                    key={university.universityId}
                    value={university.universityName}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                      setSearchQuery('');
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === university.universityName
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    <div className="flex-1">
                      <div className="font-medium">{university.universityName}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {university.city}
                        </span>
                        <span>•</span>
                        <span>{university.type}</span>
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
