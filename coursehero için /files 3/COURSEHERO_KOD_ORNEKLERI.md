# 💻 COURSEHERO PROJE - KOD ÖRNEKLERİ

Bu dosya, CourseHero benzeri platformun temel kod yapılarını içerir.

---

## 1. BACKEND - NestJS API

### 1.1. User Entity (TypeORM)

```typescript
// src/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Document } from '../../documents/entities/document.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ default: 'user' })
  role: string; // user, premium, contributor, moderator, admin

  @Column({ default: 'active' })
  status: string;

  // Academic Info
  @Column({ nullable: true })
  university_id: number;

  @Column({ nullable: true })
  faculty_id: number;

  @Column({ nullable: true })
  department_id: number;

  @Column({ nullable: true })
  student_id: string;

  @Column({ nullable: true })
  grade_level: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  gpa: number;

  // Gamification
  @Column({ default: 0 })
  points: number;

  @Column({ default: 1 })
  level: number;

  @Column({ type: 'jsonb', default: '[]' })
  badges: any[];

  // Subscription
  @Column({ default: 'free' })
  subscription_type: string;

  @Column({ nullable: true })
  subscription_start: Date;

  @Column({ nullable: true })
  subscription_end: Date;

  @Column({ default: 10 })
  credits: number;

  // Social
  @Column({ default: 0 })
  follower_count: number;

  @Column({ default: 0 })
  following_count: number;

  // Settings
  @Column({ default: false })
  email_verified: boolean;

  @Column({ default: false })
  student_verified: boolean;

  @Column({ default: false })
  two_factor_enabled: boolean;

  @Column({ type: 'jsonb', nullable: true })
  notification_settings: any;

  @Column({ type: 'jsonb', nullable: true })
  privacy_settings: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  last_login: Date;

  // Relations
  @OneToMany(() => Document, document => document.user)
  documents: Document[];
}
```

### 1.2. Auth Service

```typescript
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, full_name, username } = registerDto;

    // Check if email exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user
    const user = this.userRepository.create({
      email,
      password_hash,
      full_name,
      username,
      credits: 10, // Welcome bonus
    });

    await this.userRepository.save(user);

    // Generate JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
        credits: user.credits,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    user.last_login = new Date();
    await this.userRepository.save(user);

    // Generate JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        username: user.username,
        role: user.role,
        credits: user.credits,
        subscription_type: user.subscription_type,
      },
    };
  }

  async verifyToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
```

### 1.3. Document Upload Service

```typescript
// src/documents/documents.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { S3Service } from '../s3/s3.service';
import { OpenAIService } from '../ai/openai.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    private s3Service: S3Service,
    private aiService: OpenAIService,
  ) {}

  async create(userId: string, file: Express.Multer.File, createDocumentDto: CreateDocumentDto) {
    // 1. Upload file to S3
    const fileUrl = await this.s3Service.uploadFile(file);

    // 2. Extract text from PDF (OCR)
    const extractedText = await this.extractText(file);

    // 3. AI Analysis
    const aiAnalysis = await this.aiService.analyzeDocument(extractedText);

    // 4. Create document record
    const document = this.documentRepository.create({
      user_id: userId,
      ...createDocumentDto,
      file_url: fileUrl,
      file_name: file.originalname,
      file_size: file.size,
      file_type: file.mimetype,
      page_count: aiAnalysis.page_count,
      quality_score: aiAnalysis.quality_score,
      tags: aiAnalysis.suggested_tags,
      slug: this.generateSlug(createDocumentDto.title),
    });

    await this.documentRepository.save(document);

    // 5. Award points to user
    await this.awardPoints(userId, 10);

    return document;
  }

  async findAll(filters: any) {
    const query = this.documentRepository.createQueryBuilder('document')
      .leftJoinAndSelect('document.user', 'user')
      .where('document.status = :status', { status: 'approved' });

    // Apply filters
    if (filters.university_id) {
      query.andWhere('document.university_id = :university_id', { university_id: filters.university_id });
    }

    if (filters.course_id) {
      query.andWhere('document.course_id = :course_id', { course_id: filters.course_id });
    }

    if (filters.type) {
      query.andWhere('document.type = :type', { type: filters.type });
    }

    if (filters.search) {
      query.andWhere('document.title ILIKE :search OR document.description ILIKE :search', {
        search: `%${filters.search}%`,
      });
    }

    // Sorting
    const sortBy = filters.sort_by || 'created_at';
    const sortOrder = filters.sort_order || 'DESC';
    query.orderBy(`document.${sortBy}`, sortOrder);

    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    query.skip((page - 1) * limit).take(limit);

    const [documents, total] = await query.getManyAndCount();

    return {
      data: documents,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async download(documentId: string, userId: string) {
    const document = await this.documentRepository.findOne({
      where: { id: documentId },
      relations: ['user'],
    });

    if (!document) {
      throw new Error('Document not found');
    }

    // Check if user has credits
    const user = await this.getUserById(userId);
    if (user.credits < document.credit_cost && user.subscription_type === 'free') {
      throw new Error('Insufficient credits');
    }

    // Deduct credits (if free user)
    if (user.subscription_type === 'free') {
      await this.deductCredits(userId, document.credit_cost);
    }

    // Increment download count
    document.download_count += 1;
    await this.documentRepository.save(document);

    // Award points to document owner
    await this.awardPoints(document.user_id, 2);

    // Log download
    await this.logDownload(documentId, userId);

    return {
      download_url: document.file_url,
    };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  private async extractText(file: Express.Multer.File): Promise<string> {
    // Implement PDF text extraction (pdf-parse, Tesseract OCR, etc.)
    return '';
  }

  private async awardPoints(userId: string, points: number) {
    // Implement points system
  }

  private async deductCredits(userId: string, credits: number) {
    // Implement credit deduction
  }

  private async logDownload(documentId: string, userId: string) {
    // Log to downloads table
  }

  private async getUserById(userId: string) {
    // Get user
    return null;
  }
}
```

---

## 2. FRONTEND - Next.js 14 (React)

### 2.1. HomePage Component

```tsx
// app/page.tsx
import { Suspense } from 'react';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import TrendingNotes from '@/components/TrendingNotes';
import TopRatedNotes from '@/components/TopRatedNotes';
import Categories from '@/components/Categories';
import Stats from '@/components/Stats';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Search Bar */}
      <section className="container mx-auto px-4 -mt-8">
        <SearchBar />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <Categories />
      </section>

      {/* Trending Notes */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">🔥 Trend Notlar</h2>
        <Suspense fallback={<NotesSkeletonLoader />}>
          <TrendingNotes />
        </Suspense>
      </section>

      {/* Top Rated Notes */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">⭐ En İyi Notlar</h2>
        <Suspense fallback={<NotesSkeletonLoader />}>
          <TopRatedNotes />
        </Suspense>
      </section>

      {/* Stats */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <Stats />
        </div>
      </section>
    </main>
  );
}

function NotesSkeletonLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
          <div className="bg-gray-200 h-4 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
```

### 2.2. Note Card Component

```tsx
// components/NoteCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Star, Download, Bookmark, Eye } from 'lucide-react';

interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  downloads: number;
  views: number;
  pageCount: number;
  isPremium: boolean;
  creditCost: number;
}

export default function NoteCard({
  id,
  title,
  description,
  thumbnail,
  author,
  rating,
  downloads,
  views,
  pageCount,
  isPremium,
  creditCost,
}: NoteCardProps) {
  return (
    <Link href={`/notes/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={thumbnail || '/placeholder-document.png'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {isPremium && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              💎 {creditCost} Kredi
            </div>
          )}
          
          <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
            📄 {pageCount} sayfa
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600">
            {title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{downloads}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
          </div>

          {/* Author */}
          <div className="flex items-center gap-2 pt-3 border-t">
            <Image
              src={author.avatar || '/default-avatar.png'}
              alt={author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-gray-700">{author.name}</span>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-blue-50">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
```

### 2.3. Upload Form Component

```tsx
// app/upload/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const uploadSchema = z.object({
  title: z.string().min(10, 'Başlık en az 10 karakter olmalı'),
  description: z.string().min(50, 'Açıklama en az 50 karakter olmalı'),
  university_id: z.number(),
  faculty_id: z.number(),
  department_id: z.number(),
  course_id: z.number(),
  type: z.enum(['ders_notu', 'ozet', 'slayt', 'odev', 'sinav', 'kilavuz']),
  semester_type: z.enum(['guz', 'bahar', 'yaz']),
  academic_year: z.string(),
  tags: z.array(z.string()).min(1),
  is_original: z.boolean(),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  const onSubmit = async (data: UploadFormData) {
    if (!file) {
      alert('Lütfen bir dosya seçin');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/notes/${result.id}`);
      } else {
        alert('Yükleme başarısız oldu');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Bir hata oluştu');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">📤 Yeni Not Yükle</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          {!file ? (
            <label className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg mb-2">Dosya Sürükle veya Tıkla</p>
              <p className="text-sm text-gray-500">PDF, DOCX, PPTX (Max 50MB)</p>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.ppt,.pptx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          ) : (
            <div className="flex items-center justify-between bg-blue-50 p-4 rounded">
              <span className="font-medium">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Başlık *</label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Anayasa Hukuku I - Detaylı Ders Notları"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">Açıklama *</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Notlarınızı tanımlayın..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Dropdowns for University, Faculty, Department, Course */}
        {/* ... (Implementation similar to previous examples) */}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Yükleniyor...' : '📤 Yükle'}
        </button>
      </form>
    </div>
  );
}
```

---

## 3. DATABASE - SQL Examples

```sql
-- Örnek sorgular

-- 1. En popüler notları getir
SELECT 
  d.*,
  u.full_name as author_name,
  u.profile_image as author_avatar,
  c.name as course_name,
  uni.name as university_name
FROM documents d
JOIN users u ON d.user_id = u.id
JOIN courses c ON d.course_id = c.id
JOIN universities uni ON d.university_id = uni.id
WHERE d.status = 'approved'
ORDER BY d.download_count DESC
LIMIT 20;

-- 2. Kullanıcının puanını güncelle
UPDATE users
SET 
  points = points + 10,
  level = CASE 
    WHEN points + 10 >= 1000 THEN 5
    WHEN points + 10 >= 500 THEN 4
    WHEN points + 10 >= 250 THEN 3
    WHEN points + 10 >= 100 THEN 2
    ELSE 1
  END
WHERE id = 'user-uuid-here';

-- 3. Önerilen notları getir (basit)
SELECT d.*
FROM documents d
WHERE d.course_id IN (
  SELECT DISTINCT course_id 
  FROM downloads 
  WHERE user_id = 'current-user-id'
)
AND d.id NOT IN (
  SELECT document_id 
  FROM downloads 
  WHERE user_id = 'current-user-id'
)
AND d.status = 'approved'
ORDER BY d.rating_avg DESC
LIMIT 10;

-- 4. Günlük analitik rapor oluştur
INSERT INTO analytics (
  date,
  new_users,
  active_users,
  new_documents,
  total_downloads,
  total_views
)
SELECT 
  CURRENT_DATE,
  (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURRENT_DATE),
  (SELECT COUNT(DISTINCT user_id) FROM downloads WHERE DATE(downloaded_at) = CURRENT_DATE),
  (SELECT COUNT(*) FROM documents WHERE DATE(created_at) = CURRENT_DATE),
  (SELECT COUNT(*) FROM downloads WHERE DATE(downloaded_at) = CURRENT_DATE),
  (SELECT SUM(view_count) FROM documents WHERE DATE(updated_at) = CURRENT_DATE);
```

---

## 4. AI INTEGRATION - OpenAI Service

```typescript
// src/ai/openai.service.ts
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async analyzeDocument(text: string) {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a document analyzer. Analyze the given academic document and provide quality score, difficulty level, and suggested tags.',
        },
        {
          role: 'user',
          content: `Analyze this document: ${text.substring(0, 5000)}`,
        },
      ],
      functions: [
        {
          name: 'analyze_document',
          parameters: {
            type: 'object',
            properties: {
              quality_score: {
                type: 'number',
                description: 'Quality score from 0-5',
              },
              difficulty_level: {
                type: 'integer',
                description: 'Difficulty level from 1-5',
              },
              suggested_tags: {
                type: 'array',
                items: { type: 'string' },
                description: 'Suggested tags for the document',
              },
              summary: {
                type: 'string',
                description: 'Brief summary of the document',
              },
            },
          },
        },
      ],
      function_call: { name: 'analyze_document' },
    });

    const result = JSON.parse(completion.choices[0].message.function_call.arguments);
    return result;
  }

  async summarizeDocument(text: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a summarization assistant. Create a concise summary of the academic document in Turkish.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  }

  async answerQuestion(question: string, context: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful study assistant. Answer the student\'s question based on the provided context in Turkish.',
        },
        {
          role: 'user',
          content: `Context: ${context}\n\nQuestion: ${question}`,
        },
      ],
    });

    return completion.choices[0].message.content;
  }
}
```

---

## DEVAMI...

Bu kod örnekleri temel yapıyı göstermektedir. Tam proje için:
- Error handling eklenmeli
- Validation güçlendirilmeli
- Testing yazılmalı
- Logging implementasyonu yapılmalı
- Performance optimization uygulanmalı

