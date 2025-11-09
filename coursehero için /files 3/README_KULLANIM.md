# TÜRKİYE ÜNİVERSİTELERİ VERİ YAPISI
## Öğrenci Not Paylaşım Sistemi İçin Kullanım Kılavuzu

---

## 📁 DOSYALAR

### 1. `turkiye_universiteleri_database.json` (28 KB)
**En Detaylı Veri - JSON Format**
- İlk 2 üniversitenin tam detaylı örneği
- Hiyerarşik veri yapısı
- Programatik kullanım için ideal
- Visual Studio Code ile açılabilir

**İçerik:**
```json
{
  "metadata": {...},
  "universities": [
    {
      "id": 1,
      "name": "Üniversite Adı",
      "type": "Devlet/Vakıf",
      "city": "Şehir",
      "campuses": [...],
      "faculties": [
        {
          "name": "Fakülte Adı",
          "departments": [
            {
              "name": "Bölüm Adı",
              "degree": "Lisans",
              "courses": ["Ders1", "Ders2", ...]
            }
          ]
        }
      ],
      "institutes": [...],
      "vocational_schools": [...]
    }
  ]
}
```

### 2. `turkiye_universiteleri_liste.json` (11 KB)
**Kompakt Liste - Tüm 208 Üniversite**
- Her üniversitenin adı, türü ve şehri
- Hızlı arama için

### 3. `turkiye_universiteleri_FULL_DATABASE.md` (19 KB)
**Markdown Format - Okunabilir**
- İlk 2 üniversitenin detaylı örneği
- Visual Studio Code'da okunabilir
- İnsan tarafından düzenlenebilir

---

## 💡 SİSTEM KULLANIMI

### Not Paylaşım Sisteminde Kullanım Akışı:

```
1. ÖĞRENCI GİRİŞİ YAPAR
   ↓
2. "NOT EKLE" BUTONUNA TIKLAR
   ↓
3. ÜNİVERSİTE SEÇER
   └─> Dropdown: 208 üniversite listesi
   
4. KAMPÜS SEÇER (varsa)
   └─> Dropdown: Seçilen üniversitenin kampüsleri
   
5. BİRİM SEÇER
   └─> Radio Button veya Tabs:
       • Fakülteler
       • Enstitüler  
       • Meslek Yüksekokulları
   
6. BÖLÜM/PROGRAM SEÇER
   └─> Dropdown: Seçilen birime ait bölümler
   
7. DERS SEÇER
   └─> Dropdown veya Autocomplete: Bölüme ait dersler
   
8. NOT BİLGİLERİNİ GİRER
   - Ders kodu (varsa)
   - Dönem (Güz/Bahar)
   - Yıl
   - Not dosyası (PDF/DOCX)
   - Açıklama
   
9. KAYDET
```

---

## 🔧 PROGRAMATIK KULLANIM ÖRNEKLERİ

### JavaScript/Node.js

```javascript
// JSON dosyasını yükle
const fs = require('fs');
const data = JSON.parse(
  fs.readFileSync('turkiye_universiteleri_database.json', 'utf8')
);

// Üniversite ara
function findUniversity(name) {
  return data.universities.find(u => u.name.includes(name));
}

// Fakülte ara
function getFaculties(universityId) {
  const uni = data.universities.find(u => u.id === universityId);
  return uni ? uni.faculties : [];
}

// Ders ara
function getCourses(universityId, facultyName, departmentName) {
  const uni = data.universities.find(u => u.id === universityId);
  const faculty = uni.faculties.find(f => f.name === facultyName);
  const dept = faculty.departments.find(d => d.name === departmentName);
  return dept ? dept.courses : [];
}

// Kullanım örneği
const uni = findUniversity('Acıbadem');
console.log(uni.name); // "Acıbadem Mehmet Ali Aydınlar Üniversitesi"
console.log(uni.faculties[0].name); // "Tıp Fakültesi"
```

### Python

```python
import json

# JSON dosyasını yükle
with open('turkiye_universiteleri_database.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Üniversite ara
def find_university(name):
    for uni in data['universities']:
        if name.lower() in uni['name'].lower():
            return uni
    return None

# Tüm dersleri listele
def get_all_courses(university_id, faculty_name, department_name):
    for uni in data['universities']:
        if uni['id'] == university_id:
            for faculty in uni['faculties']:
                if faculty['name'] == faculty_name:
                    for dept in faculty['departments']:
                        if dept['name'] == department_name:
                            return dept['courses']
    return []

# Kullanım örneği
uni = find_university('Adana')
print(uni['name'])  # "Adana Alparslan Türkeş Bilim ve Teknoloji Üniversitesi"

courses = get_all_courses(2, 'Mühendislik Fakültesi', 'Bilgisayar Mühendisliği')
print(courses[:5])  # İlk 5 ders
```

### PHP

```php
<?php
// JSON dosyasını yükle
$json = file_get_contents('turkiye_universiteleri_database.json');
$data = json_decode($json, true);

// Üniversite ara
function findUniversity($name, $data) {
    foreach ($data['universities'] as $uni) {
        if (stripos($uni['name'], $name) !== false) {
            return $uni;
        }
    }
    return null;
}

// Dropdown için HTML oluştur
function generateUniversityDropdown($data) {
    echo '<select name="university" id="university">';
    echo '<option value="">Üniversite Seçin</option>';
    
    foreach ($data['universities'] as $uni) {
        echo sprintf(
            '<option value="%d">%s - %s - %s</option>',
            $uni['id'],
            $uni['name'],
            $uni['type'],
            $uni['city']
        );
    }
    
    echo '</select>';
}

// AJAX endpoint için
function getUniversityData($id, $data) {
    foreach ($data['universities'] as $uni) {
        if ($uni['id'] == $id) {
            return json_encode($uni);
        }
    }
    return json_encode(['error' => 'Not found']);
}
?>
```

---

## 📊 VERİTABANI ŞEMASI (SQL)

### Önerilen Tablo Yapısı:

```sql
CREATE TABLE universities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    type ENUM('Devlet', 'Vakıf', 'Vakıf MYO') NOT NULL,
    city VARCHAR(100),
    founded_year INT,
    website VARCHAR(255),
    INDEX idx_name (name),
    INDEX idx_city (city)
);

CREATE TABLE campuses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    university_id INT,
    name VARCHAR(255),
    location VARCHAR(255),
    FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE
);

CREATE TABLE faculties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    university_id INT,
    name VARCHAR(255),
    FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE,
    INDEX idx_name (name)
);

CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT,
    name VARCHAR(255),
    degree_type ENUM('Lisans', 'Ön Lisans', 'Yüksek Lisans', 'Doktora'),
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE CASCADE,
    INDEX idx_name (name)
);

CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_id INT,
    name VARCHAR(255),
    code VARCHAR(50),
    credit INT,
    semester INT,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE,
    INDEX idx_name (name),
    INDEX idx_code (code)
);

CREATE TABLE student_notes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    university_id INT,
    faculty_id INT,
    department_id INT,
    course_id INT,
    file_path VARCHAR(500),
    description TEXT,
    semester ENUM('Güz', 'Bahar'),
    year INT,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    downloads INT DEFAULT 0,
    likes INT DEFAULT 0,
    FOREIGN KEY (university_id) REFERENCES universities(id),
    FOREIGN KEY (faculty_id) REFERENCES faculties(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    INDEX idx_course (course_id),
    INDEX idx_user (user_id)
);
```

---

## 🔍 ARAMA FONKSİYONLARI

### Basit Arama (String Match)
```javascript
function searchCourse(keyword, universityData) {
    const results = [];
    
    universityData.universities.forEach(uni => {
        uni.faculties.forEach(faculty => {
            faculty.departments.forEach(dept => {
                dept.courses.forEach(course => {
                    if (course.toLowerCase().includes(keyword.toLowerCase())) {
                        results.push({
                            university: uni.name,
                            faculty: faculty.name,
                            department: dept.name,
                            course: course
                        });
                    }
                });
            });
        });
    });
    
    return results;
}
```

### Autocomplete İçin
```javascript
function getCourseAutocomplete(partialName, maxResults = 10) {
    const results = [];
    
    // ... (yukarıdaki arama mantığı)
    
    return results.slice(0, maxResults);
}
```

---

## 📱 FRONTEND KULLANIM ÖRNEĞİ (React)

```jsx
import React, { useState, useEffect } from 'react';
import universityData from './turkiye_universiteleri_database.json';

function NoteUploadForm() {
    const [university, setUniversity] = useState('');
    const [faculties, setFaculties] = useState([]);
    const [faculty, setFaculty] = useState('');
    const [departments, setDepartments] = useState([]);
    const [department, setDepartment] = useState('');
    const [courses, setCourses] = useState([]);
    
    // Üniversite seçildiğinde fakülteleri getir
    useEffect(() => {
        if (university) {
            const uni = universityData.universities.find(u => u.id === parseInt(university));
            setFaculties(uni ? uni.faculties : []);
        }
    }, [university]);
    
    // Fakülte seçildiğinde bölümleri getir
    useEffect(() => {
        if (faculty) {
            const fac = faculties.find(f => f.name === faculty);
            setDepartments(fac ? fac.departments : []);
        }
    }, [faculty, faculties]);
    
    // Bölüm seçildiğinde dersleri getir
    useEffect(() => {
        if (department) {
            const dept = departments.find(d => d.name === department);
            setCourses(dept ? dept.courses : []);
        }
    }, [department, departments]);
    
    return (
        <form>
            <select onChange={(e) => setUniversity(e.target.value)}>
                <option value="">Üniversite Seçin</option>
                {universityData.universities.map(uni => (
                    <option key={uni.id} value={uni.id}>
                        {uni.name} - {uni.city}
                    </option>
                ))}
            </select>
            
            <select onChange={(e) => setFaculty(e.target.value)} disabled={!university}>
                <option value="">Fakülte Seçin</option>
                {faculties.map(fac => (
                    <option key={fac.name} value={fac.name}>
                        {fac.name}
                    </option>
                ))}
            </select>
            
            <select onChange={(e) => setDepartment(e.target.value)} disabled={!faculty}>
                <option value="">Bölüm Seçin</option>
                {departments.map(dept => (
                    <option key={dept.name} value={dept.name}>
                        {dept.name} ({dept.degree})
                    </option>
                ))}
            </select>
            
            <select disabled={!department}>
                <option value="">Ders Seçin</option>
                {courses.map((course, idx) => (
                    <option key={idx} value={course}>
                        {course}
                    </option>
                ))}
            </select>
            
            {/* Diğer form alanları... */}
        </form>
    );
}
```

---

## ⚠️ ÖNEMLİ NOTLAR

### 1. Veri Güncelliği
- Bu veri yapısı 2025 yılı için hazırlanmıştır
- YÖK'ün resmi verilerine dayanmaktadır
- Yeni bölümler/dersler eklenebilir
- Dönemsel güncelleme önerilir

### 2. Eksik Veriler
- İlk 2 üniversite detaylı örnek içermektedir
- Kalan 206 üniversite için aynı format uygulanmalıdır
- Her üniversitenin web sitesinden güncel bilgi alınabilir
- YÖK Atlas'tan program ve ders bilgileri çekilebilir

### 3. Ders Kodları
- Ders kodları üniversitelere göre farklılık gösterir
- Her üniversitenin kendi kodlama sistemi vardır
- Ders kodları ayrıca eklenmelidir

### 4. Lisans Türleri
- Ön Lisans (2 yıl - MYO)
- Lisans (4 yıl - normal)
- Lisans (5 yıl - mimarlık)
- Lisans (6 yıl - tıp, diş hekimliği, veterinerlik)
- Yüksek Lisans (Tezli: 2 yıl, Tezsiz: 1.5 yıl)
- Doktora (4 yıl)

---

## 🚀 SONRAKI ADIMLAR

### Veri Tamamlama İçin:

1. **YÖK Atlas API Kullanımı**
   - https://yokatlas.yok.gov.tr
   - Otomatik veri çekme

2. **Web Scraping**
   - Her üniversitenin web sitesi
   - Bologna süreci bilgileri

3. **Manuel Veri Girişi**
   - Öğrenci katkıları
   - Akademisyen onayı

4. **Veri Doğrulama**
   - Çapraz kontrol
   - Güncelleme sistemi

---

## 📞 DESTEK

**Veri Kaynakları:**
- YÖK: https://www.yok.gov.tr
- YÖK Atlas: https://yokatlas.yok.gov.tr
- ÖSYM: https://www.osym.gov.tr

**Güncellemeler:**
- Yılda 2 kez güncelleme önerilir (Güz ve Bahar dönemleri)
- YÖK'ün açıkladığı yeni programlar takip edilmeli

---

## ✅ KULLANIMA HAZIR

Tüm dosyalar `/mnt/user-data/outputs/` klasöründe:

1. ✓ `turkiye_universiteleri_database.json` (JSON - Detaylı)
2. ✓ `turkiye_universiteleri_liste.json` (JSON - Özet)
3. ✓ `turkiye_universiteleri_FULL_DATABASE.md` (Markdown)
4. ✓ `turkiye_universiteleri_2025.pdf` (PDF Dokümantasyon)
5. ✓ `README_KULLANIM.md` (Bu dosya)

**Başarılar dileriz!** 🎓
