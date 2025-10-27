'use client';

import React from 'react';
import { Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Ana Sayfa', href: '/home' },
      { label: 'Notlar', href: '/documents' },
      { label: 'Soru & Cevap', href: '/qa' },
      { label: 'Özel Ders', href: '/tutors' }
    ],
    company: [
      { label: 'Hakkımızda', href: '/about' },
      { label: 'İletişim', href: '/contact' },
      { label: 'Kariyer', href: '/careers' },
      { label: 'Blog', href: '/blog' }
    ],
    legal: [
      { label: 'Kullanım Koşulları', href: '/terms' },
      { label: 'Gizlilik Politikası', href: '/privacy' },
      { label: 'Telif Hakları', href: '/copyright' },
      { label: 'KVKK', href: '/kvkk' }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img
                  src="/image/logo.png"
                  alt="KargaNot Logo"
                  className="h-12 w-auto mb-4"
                />
                <p className="text-lg font-semibold text-orange-600 mb-3">
                  Bilgini paylaş, birlikte yüksel!
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Türkiye'nin en büyük öğrenci bilgi paylaşım platformu. 
                  Binlerce öğrenci KargaNot'ta bilgisini paylaşarak kazanıyor.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <a href="mailto:info@karganot.com" className="hover:text-orange-600 transition-colors">
                    info@karganot.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <a href="tel:+908501234567" className="hover:text-orange-600 transition-colors">
                    0850 123 45 67
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-orange-500 mt-1" />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-orange-600 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Kurumsal</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Yasal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm text-center md:text-left">
              © {currentYear} KargaNot – Onur tarafından geliştirilmiştir.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/terms" className="hover:text-orange-600 transition-colors">
                Koşullar
              </Link>
              <Link href="/privacy" className="hover:text-orange-600 transition-colors">
                Gizlilik
              </Link>
              <Link href="/cookies" className="hover:text-orange-600 transition-colors">
                Çerezler
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// KARGANOT UI Update - by Onur & Copilot
