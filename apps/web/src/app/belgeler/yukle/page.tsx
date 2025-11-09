// KARGANOT Frontend Perfection Update - by Onur & Copilot
'use client';

import React, { useState } from 'react';
import { Upload, FileText, Tag, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import UniversityCascadeSelect from '@/components/UniversityCascadeSelect';
import api from '@/utils/api';

export default function UploadPage() {
  const [selection, setSelection] = useState<{
    university?: string;
    faculty?: string;
    department?: string;
    class?: number;
    course?: string;
  }>({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'OZET' as 'VIZE' | 'FINAL' | 'ODEV' | 'PROJE' | 'QUIZ' | 'OZET' | 'SLAYT',
    price: 10,
    tags: [] as string[],
  });

  const [file, setFile] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const noteTypes = [
    { value: 'VIZE', label: 'Vize Sınavı' },
    { value: 'FINAL', label: 'Final Sınavı' },
    { value: 'ODEV', label: 'Ödev' },
    { value: 'PROJE', label: 'Proje' },
    { value: 'QUIZ', label: 'Kısa Sınav' },
    { value: 'OZET', label: 'Özet' },
    { value: 'SLAYT', label: 'Slayt' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 50 * 1024 * 1024; // 50MB

      if (selectedFile.size > maxSize) {
        alert('Dosya boyutu 50MB\'dan küçük olmalıdır');
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Lütfen dosya seçiniz');
      return;
    }

    if (!selection.course) {
      alert('Lütfen ders seçiniz');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      // Simulate file upload to S3 (mock)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create note metadata
      const noteData = {
        courseId: selection.course,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        price: formData.price,
        tags: formData.tags,
        // In real scenario, fileUrl would come from S3 upload
        fileUrl: `https://mock-s3.com/${file.name}`,
      };

      const response = await api.post('/v1/notes', noteData);

      if (response.data.success) {
        setUploadStatus('success');
        // Reset form
        setFormData({
          title: '',
          description: '',
          type: 'OZET',
          price: 10,
          tags: [],
        });
        setFile(null);
        setSelection({});
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/image/kargalar.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Upload className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Notunu Yükle</h1>
            <p className="text-orange-50 text-lg">
              Elindeki kaliteli notları paylaş, her satıştan kazanç elde et!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Message */}
        {uploadStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-8 flex items-center gap-4"
          >
            <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-green-900 mb-1">Yükleme Başarılı!</h3>
              <p className="text-green-700">
                Notunuz yönetici onayı bekliyor. Onaylandıktan sonra yayınlanacaktır.
              </p>
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {uploadStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border-2 border-red-500 rounded-xl p-6 mb-8 flex items-center gap-4"
          >
            <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">Yükleme Başarısız</h3>
              <p className="text-red-700">Bir hata oluştu. Lütfen tekrar deneyin.</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Course Selection */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-orange-500" />
              Ders Seçimi
            </h2>
            <UniversityCascadeSelect
              onSelectionChange={setSelection}
              initialValues={selection}
            />
          </div>

          {/* Note Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-orange-500" />
              Not Detayları
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlık *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Örn: Kalkülüs I - Final Sınavı 2024 Çözümlü"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Notun içeriği hakkında kısa bir açıklama yazın..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              {/* Type and Price */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Not Tipi *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as any })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {noteTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Kazancın: {(formData.price * 0.7).toFixed(2)} ₺ (Komisyon %30)
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Etiketler
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Etiket ekle (Enter ile)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Ekle
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-orange-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dosya Yükle *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    {file ? (
                      <div>
                        <p className="text-green-600 font-semibold">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 font-medium mb-1">
                          Dosya seçmek için tıklayın
                        </p>
                        <p className="text-sm text-gray-500">
                          PDF, DOCX, PPT, JPG (Max 50MB)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isUploading || !file || !selection.course}
              className="px-12 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl font-semibold text-lg flex items-center gap-3"
            >
              <Upload className="w-5 h-5" />
              {isUploading ? 'Yükleniyor...' : 'Notunu Yükle'}
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-3">📌 Yükleme Kuralları</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>✓ Yüklediğiniz notlar moderatör onayından geçecektir</li>
            <li>✓ Telif hakkı ihlali yapan içerikler kabul edilmez</li>
            <li>✓ Spam veya düşük kaliteli içerikler reddedilir</li>
            <li>✓ Kazanç paylaşımı komisyon oranları ödeme adımında şeffaf biçimde sunulur</li>
            <li>✓ Minimum çekim tutarı 50 ₺'dir</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
