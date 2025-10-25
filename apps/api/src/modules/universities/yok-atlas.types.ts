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

export interface YokAtlasSearchParams {
  q?: string;
  uni_adi?: string;
  program_adi?: string;
  sehir?: string;
  limit?: number;
}
