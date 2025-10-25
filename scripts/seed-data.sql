-- Seed data for Turkish universities

-- Insert major Turkish universities
INSERT INTO universities (id, name, city, code) VALUES
  ('univ_001', 'İstanbul Üniversitesi', 'İstanbul', 'IST'),
  ('univ_002', 'Boğaziçi Üniversitesi', 'İstanbul', 'BOUN'),
  ('univ_003', 'İstanbul Teknik Üniversitesi', 'İstanbul', 'ITU'),
  ('univ_004', 'Orta Doğu Teknik Üniversitesi', 'Ankara', 'METU'),
  ('univ_005', 'Ankara Üniversitesi', 'Ankara', 'AU'),
  ('univ_006', 'Hacettepe Üniversitesi', 'Ankara', 'HU'),
  ('univ_007', 'Ege Üniversitesi', 'İzmir', 'EGE'),
  ('univ_008', 'Dokuz Eylül Üniversitesi', 'İzmir', 'DEU'),
  ('univ_009', 'Koç Üniversitesi', 'İstanbul', 'KU'),
  ('univ_010', 'Sabancı Üniversitesi', 'İstanbul', 'SU'),
  ('univ_011', 'Bilkent Üniversitesi', 'Ankara', 'BILKENT'),
  ('univ_012', 'Yıldız Teknik Üniversitesi', 'İstanbul', 'YTU'),
  ('univ_013', 'Gazi Üniversitesi', 'Ankara', 'GAZI'),
  ('univ_014', 'Anadolu Üniversitesi', 'Eskişehir', 'ANADOLU'),
  ('univ_015', 'Marmara Üniversitesi', 'İstanbul', 'MARMARA');

-- Insert departments for Istanbul University
INSERT INTO departments (id, name, code, university_id) VALUES
  ('dept_001', 'Bilgisayar Mühendisliği', 'CE', 'univ_001'),
  ('dept_002', 'Elektrik-Elektronik Mühendisliği', 'EE', 'univ_001'),
  ('dept_003', 'İşletme', 'BA', 'univ_001'),
  ('dept_004', 'İktisat', 'ECON', 'univ_001'),
  ('dept_005', 'Hukuk', 'LAW', 'univ_001'),
  ('dept_006', 'Tıp', 'MED', 'univ_001');

-- Insert courses for Computer Engineering
INSERT INTO courses (id, name, code, credits, semester, department_id) VALUES
  ('course_001', 'Veri Yapıları', 'CE201', 4, 'Fall', 'dept_001'),
  ('course_002', 'Algoritmalar', 'CE301', 4, 'Spring', 'dept_001'),
  ('course_003', 'Veritabanı Sistemleri', 'CE302', 3, 'Fall', 'dept_001'),
  ('course_004', 'İşletim Sistemleri', 'CE303', 4, 'Spring', 'dept_001'),
  ('course_005', 'Bilgisayar Ağları', 'CE304', 3, 'Fall', 'dept_001'),
  ('course_006', 'Yazılım Mühendisliği', 'CE401', 3, 'Fall', 'dept_001'),
  ('course_007', 'Yapay Zeka', 'CE402', 3, 'Spring', 'dept_001'),
  ('course_008', 'Web Programlama', 'CE305', 3, 'Spring', 'dept_001');

-- Create admin user (password: Admin123!)
-- Note: In real implementation, this should be hashed with bcrypt
INSERT INTO users (id, email, name, password, role, verified) VALUES
  ('admin_001', 'admin@karganot.com', 'Admin User', '$2b$10$YourHashedPasswordHere', 'ADMIN', true);

-- Note: Run this after Prisma migrations
