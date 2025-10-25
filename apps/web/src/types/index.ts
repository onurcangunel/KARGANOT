export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'SELLER' | 'ADMIN';
  verified: boolean;
  university?: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface University {
  id: string;
  name: string;
  city: string;
  code: string;
  logo?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  universityId: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits?: number;
  semester?: string;
  departmentId: string;
}

export interface Note {
  id: string;
  title: string;
  description?: string;
  price: number;
  fileKey: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  thumbnailKey?: string;
  pageCount?: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  viewCount: number;
  downloadCount: number;
  sellerId: string;
  seller?: {
    id: string;
    name: string;
    rating?: number;
  };
  universityId: string;
  university?: University;
  courseId?: string;
  course?: Course;
  reviews?: Review[];
  averageRating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  id: string;
  buyerId: string;
  noteId: string;
  note?: Note;
  amount: number;
  commission: number;
  sellerEarning: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentProvider: string;
  paymentId?: string;
  accessToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  noteId: string;
  userId: string;
  user?: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}
