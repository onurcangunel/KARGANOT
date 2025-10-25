import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Doğrudan Python API'yi kullan (Backend proxy yerine)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface YokAtlasUniversity {
  universityId: string;
  universityName: string;
  city: string;
  type: string;
}

export interface YokAtlasFaculty {
  facultyId: string;
  facultyName: string;
  universityName: string;
}

export interface YokAtlasDepartment {
  programId: string;
  programName: string;
  facultyName: string;
  universityName: string;
  city: string;
  type: string;
  quota?: number;
  scoreType?: string;
}

/**
 * Üniversiteleri getir (autocomplete için)
 */
export function useUniversities() {
  return useQuery({
    queryKey: ['universities'],
    queryFn: async () => {
      const { data } = await axios.get<YokAtlasUniversity[]>(
        `${API_BASE_URL}/universities`
      );
      return data; // Doğrudan array döner
    },
    staleTime: 1000 * 60 * 60, // 1 saat
    gcTime: 1000 * 60 * 60 * 24, // 24 saat (eski: cacheTime)
  });
}

/**
 * Fakülteleri getir
 */
export function useFaculties(universityName: string | null) {
  return useQuery({
    queryKey: ['faculties', universityName],
    queryFn: async () => {
      if (!universityName) return [];
      const { data } = await axios.get<YokAtlasFaculty[]>(
        `${API_BASE_URL}/faculties`,
        { params: { universityName } }
      );
      return data; // Doğrudan array döner
    },
    enabled: !!universityName,
    staleTime: 1000 * 60 * 30, // 30 dakika
  });
}

/**
 * Bölümleri getir
 */
export function useDepartments(
  universityName: string | null,
  facultyName: string | null
) {
  return useQuery({
    queryKey: ['departments', universityName, facultyName],
    queryFn: async () => {
      if (!universityName || !facultyName) return [];
      const { data } = await axios.get<YokAtlasDepartment[]>(
        `${API_BASE_URL}/programs`,
        { params: { universityName, facultyName } }
      );
      return data; // Doğrudan array döner
    },
    enabled: !!universityName && !!facultyName,
    staleTime: 1000 * 60 * 30, // 30 dakika
  });
}

/**
 * YÖK Atlas'ta ara
 */
export function useYokAtlasSearch(
  query: string,
  searchType: 'university' | 'program' = 'university',
  enabled = true
) {
  return useQuery({
    queryKey: ['yok-atlas-search', query, searchType],
    queryFn: async () => {
      if (!query || query.length < 2) return [];
      
      const params: any = {
        limit: 50,
      };
      
      if (searchType === 'university') {
        params.uni_adi = query;
      } else {
        params.program_adi = query;
      }
      
      const { data } = await axios.get<any[]>(
        `${API_BASE_URL}/search`,
        { params }
      );
      return data; // Doğrudan array döner
    },
    enabled: enabled && query.length >= 2,
    staleTime: 1000 * 60 * 5, // 5 dakika
  });
}
