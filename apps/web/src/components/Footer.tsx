'use client'

import Logo from './Logo'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  const footerLinks = {
    company: {
      title: 'Şirket',
      links: [
        { label: 'Hakkımızda', href: '/about' },
        { label: 'Kariyer', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Basın', href: '/press' },
      ]
    },
    community: {
      title: 'Topluluk',
      links: [
        { label: 'Öğrenciler', href: '/students' },
        { label: 'Eğitmenler', href: '/educators' },
        { label: 'Yayıncılar', href: '/publishers' },
        { label: 'Kurumlar', href: '/institutions' },
      ]
    },
    support: {
      title: 'Destek',
      links: [
        { label: 'Yardım Merkezi', href: '/help' },
        { label: 'İletişim', href: '/contact' },
        { label: 'SSS', href: '/faq' },
        { label: 'Topluluk Kuralları', href: '/community-guidelines' },
      ]
    },
    legal: {
      title: 'Yasal',
      links: [
        { label: 'Kullanım Koşulları', href: '/terms' },
        { label: 'Gizlilik Politikası', href: '/privacy' },
        { label: 'Telif Hakkı Politikası', href: '/copyright' },
        { label: 'Çerez Politikası', href: '/cookies' },
      ]
    }
  }

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo size="md" className="mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              Binlerce öğrencinin güvendiği not paylaşım platformu. Sınavlarınızda başarılı olun!
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.company.title}</h3>
            <ul className="space-y-2">
              {footerLinks.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.community.title}</h3>
            <ul className="space-y-2">
              {footerLinks.community.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.support.title}</h3>
            <ul className="space-y-2">
              {footerLinks.support.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footerLinks.legal.title}</h3>
            <ul className="space-y-2">
              {footerLinks.legal.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} KARGANOT. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Erişilebilirlik
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                Site Haritası
              </Link>
              <button className="hover:text-white transition-colors">
                🇹🇷 Türkçe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
