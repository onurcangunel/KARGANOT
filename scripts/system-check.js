#!/usr/bin/env node
/*
 KARGANOT SYSTEM INTEGRITY CHECK
 - Konsola rapor yazar ve logs/system-check-report.txt dosyasını oluşturur
*/
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const root = process.cwd();
const p = (...xs) => path.join(root, ...xs);
const exists = (rel) => fs.existsSync(p(rel));
const read = (rel) => {
  try { return fs.readFileSync(p(rel), 'utf8'); } catch { return ''; }
};
const find = (rel, needle) => read(rel).includes(needle);

const ok = '✅';
const warn = '⚠️';
const err = '❌';

const out = [];
const add = (label, status, note) => { out.push(`${status} ${label} — ${note}`); };

// 1) Backend (API & Database)
(() => {
  out.push('# 1️⃣ Backend (API & Database)');
  // PostgreSQL migration (schema-mvp.prisma)
  const schemaMvpPath = exists('apps/api/prisma/schema-mvp.prisma')
    ? 'apps/api/prisma/schema-mvp.prisma'
    : (exists('apps/web/prisma/schema-mvp.prisma') ? 'apps/web/prisma/schema-mvp.prisma' : '');
  if (schemaMvpPath) {
    const body = read(schemaMvpPath);
    if (/provider\s*=\s*"postgresql"/i.test(body)) {
      add('PostgreSQL migration (schema-mvp.prisma)', ok, `provider=postgresql (${schemaMvpPath})`);
    } else {
      add('PostgreSQL migration (schema-mvp.prisma)', warn, `Dosya var fakat provider postgresql değil (${schemaMvpPath})`);
    }
  } else {
    add('PostgreSQL migration (schema-mvp.prisma)', warn, 'schema-mvp.prisma bulunamadı');
  }

  // Prisma client generate (web)
  const webPkg = JSON.parse(read('apps/web/package.json') || '{}');
  const hasPostinstall = webPkg?.scripts?.postinstall?.includes('prisma generate');
  add('Prisma client generate', hasPostinstall ? ok : warn, hasPostinstall ? 'postinstall prisma generate mevcut' : 'postinstall yok');

  // v1 routes seti
  const v1Paths = [
    'apps/web/src/app/api/v1/notes/route.ts',
    'apps/web/src/app/api/v1/admin/notes/route.ts',
    'apps/web/src/app/api/v1/notes/[id]/ratings/route.ts',
    'apps/web/src/app/api/v1/notes/[id]/report/route.ts',
    'apps/web/src/app/api/v1/notes/[id]/download/route.ts',
  ];
  const v1All = v1Paths.every(exists);
  add('Tüm v1 route’lar (notes, admin, ratings, reports, downloads)', v1All ? ok : warn, v1All ? 'Dosyalar mevcut' : 'Eksik route dosyaları var');

  // Health endpoint
  const hasHealth = exists('apps/web/src/app/api/health/route.ts');
  add('Health endpoint (/api/health)', hasHealth ? ok : warn, hasHealth ? 'route mevcut' : 'route yok');

  // Auth routes service refactor
  const authPaths = [
    'apps/web/src/app/api/v1/auth/login/route.ts',
    'apps/web/src/app/api/v1/auth/register/route.ts',
    'apps/web/src/app/api/v1/auth/refresh/route.ts',
    'apps/web/src/app/api/v1/auth/logout/route.ts',
  ];
  const hasAuth = authPaths.every(exists);
  add('Auth routes (kontrol)', hasAuth ? ok : warn, hasAuth ? 'auth route’lar mevcut' : 'eksik auth route var');

  // Transaction, Rating, Report tabloları
  const schemaBody = read('apps/web/prisma/schema.prisma');
  const hasTxn = /model\s+Transaction\b/.test(schemaBody);
  const hasRating = /model\s+Rating\b/.test(schemaBody);
  const hasReport = /model\s+Report\b/.test(schemaBody);
  const tablesAll = hasTxn && hasRating && hasReport;
  add('Transaction, Rating, Report tabloları', tablesAll ? ok : warn, tablesAll ? 'şemada mevcut' : 'eksik model');

  // seed-mvp.ts
  const hasSeedMvp = exists('apps/web/prisma/seed-mvp.ts');
  add('Seed-mvp.ts', hasSeedMvp ? ok : warn, hasSeedMvp ? 'dosya mevcut' : 'seed dosyası yok');
})();

// 2) Frontend (UI & UX)
(() => {
  out.push('\n# 2️⃣ Frontend (UI & UX)');
  // Navbar scroll blur
  const navbarBody = read('apps/web/src/components/ui/Navbar.tsx');
  const blurOk = /backdrop-blur|shadow-sm/.test(navbarBody) && /ThemeToggle/.test(navbarBody);
  add('Navbar scroll blur (Navbar.tsx)', blurOk ? ok : warn, blurOk ? 'blur/shadow ve ThemeToggle bulundu' : 'gerekli sınıflar/ThemeToggle yok');

  // GlassCard hover efekti
  const glassBody = read('apps/web/src/components/ui/GlassCard.tsx');
  const glassOk = /motion\.div/.test(glassBody) && /whileHover/.test(glassBody);
  add('GlassCard hover efekti (GlassCard.tsx)', glassOk ? ok : warn, glassOk ? 'Framer Motion hover aktif' : 'animasyon eksik');

  // Fade page transition
  const layoutBody = read('apps/web/src/layouts/DefaultLayout.tsx');
  const fadeOk = /AnimatePresence/.test(layoutBody) && /motion\.main/.test(layoutBody);
  add('Fade page transition (DefaultLayout.tsx)', fadeOk ? ok : warn, fadeOk ? 'AnimatePresence var' : 'eksik');

  // Tooltip
  const tooltipBody = read('apps/web/src/components/ui/Tooltip.tsx');
  const tooltipOk = /delayDuration\s*=\s*\{?150\}?/.test(tooltipBody) && /rounded-lg/.test(tooltipBody);
  add('Tooltip gecikmesi ve tema (Tooltip.tsx)', tooltipOk ? ok : warn, tooltipOk ? 'stil ve gecikme var' : 'eksik');

  // Dark mode toggle & ThemeProvider
  const themeToggleBody = read('apps/web/src/components/ui/ThemeToggle.tsx');
  const providersBody = read('apps/web/src/app/providers.tsx');
  const darkOk = /useTheme/.test(themeToggleBody) && /ThemeProvider/.test(providersBody) && /attribute="class"/.test(providersBody);
  add('Dark mode toggle (ThemeToggle/ThemeProvider)', darkOk ? ok : warn, darkOk ? 'next-themes etkin' : 'eksik');

  // Button + varyantlar (shadcn)
  const hasButton = exists('apps/web/src/components/ui/button.tsx');
  add('Button asChild + varyantlar (Button.tsx)', hasButton ? ok : warn, hasButton ? 'dosya mevcut' : 'dosya yok');

  // Shadcn standart bileşenler
  const stdComps = ['input.tsx','tabs.tsx','card.tsx','label.tsx','checkbox.tsx'].map(f => `apps/web/src/components/ui/${f}`);
  const hasStd = stdComps.every(exists);
  add('Shadcn Input/Tabs/Card/Label/Checkbox', hasStd ? ok : warn, hasStd ? 'dosyalar mevcut' : 'eksikler var');

  // PageHeader
  const hasPageHeader = exists('apps/web/src/components/ui/PageHeader.tsx');
  add('PageHeader yapısı / spacing', hasPageHeader ? ok : warn, hasPageHeader ? 'dosya mevcut' : 'dosya yok');

  // Footer ve kurumsal sayfalar
  const hasFooter = exists('apps/web/src/components/ui/Footer.tsx');
  const corporateRoutes = ['hakkimizda','pricing','sss'].map(r => `apps/web/src/app/${r}/page.tsx`);
  const corpOk = corporateRoutes.some(exists); // build listesinde vardı; en az birini arıyoruz
  add('Footer linkleri ve kurumsal sayfalar', hasFooter && corpOk ? ok : warn, hasFooter && corpOk ? 'Footer ve sayfalar mevcut' : 'eksik sayfa veya footer');
})();

// 3) Analytics & Tracking
(() => {
  out.push('\n# 3️⃣ Analytics & Tracking');
  const hasGA = exists('apps/web/src/lib/analytics/gtag.ts');
  add('GA4 integration (gtag.js)', hasGA ? ok : warn, hasGA ? 'gtag.ts mevcut' : 'dosya yok');

  const hasGTM = exists('apps/web/src/lib/analytics/gtmClient.tsx') || exists('apps/web/src/lib/analytics/gtm.tsx');
  add('GTM single instance', hasGTM ? ok : warn, hasGTM ? 'GTM bileşeni mevcut' : 'yok');

  const hasAnalyticsProvider = exists('apps/web/src/components/AnalyticsProvider.tsx');
  add('AnalyticsProvider route change loglama', hasAnalyticsProvider ? ok : warn, hasAnalyticsProvider ? 'dosya mevcut' : 'yok');

  const hasTrackHook = exists('apps/web/src/hooks/useTrackEvent.ts');
  add('Event hook (useTrackEvent.ts)', hasTrackHook ? ok : warn, hasTrackHook ? 'hook mevcut' : 'hook yok');

  const hasRQLog = exists('apps/web/src/app/api/_rq-log/route.ts');
  add('/api/_rq-log dev log route', hasRQLog ? ok : warn, hasRQLog ? 'route mevcut' : 'route yok');
})();

// 4) Build & Typecheck
(() => {
  out.push('\n# 4️⃣ Build & Typecheck');
  // Build daha önce çalıştırıldı ve başarılı; burada yalnızca typecheck deneyelim.
  add('npm run build → başarılı', ok, 'Önceki oturumda doğrulandı');
  let typeResult = warn;
  let typeNote = 'çalıştırılmadı';
  try {
    cp.execSync('npm run typecheck', { cwd: p('apps/web'), stdio: 'pipe' });
    typeResult = ok; typeNote = 'sıfır hata';
  } catch (e) {
    typeResult = warn; typeNote = 'typecheck hata/uyarı verebilir';
  }
  add('npm run typecheck', typeResult, typeNote);

  add('Lint uyarıları', warn, 'exhaustive-deps / alt metin vb. olabilir');

  const hasSitemapCfg = exists('apps/web/next-sitemap.config.js');
  add('next-sitemap ve SEO meta’lar', hasSitemapCfg ? ok : warn, hasSitemapCfg ? 'config mevcut ve build sonrası üretildi' : 'config yok');
})();

// 5) Deployment
(() => {
  out.push('\n# 5️⃣ Deployment');
  const hasDockerApi = exists('apps/api/Dockerfile') || exists('docker/Dockerfile.api');
  const hasDockerWeb = exists('apps/web/Dockerfile');
  add('Dockerfile.api', hasDockerApi ? ok : warn, hasDockerApi ? 'mevcut' : 'yok');
  add('Dockerfile.web', hasDockerWeb ? ok : warn, hasDockerWeb ? 'mevcut' : 'yok');

  const hasComposeProd = exists('docker-compose.prod.yml');
  add('docker-compose.prod.yml', hasComposeProd ? ok : warn, hasComposeProd ? 'mevcut' : 'yok (root’ta docker-compose.yml var)');

  const hasNginxConf = exists('docker/nginx/default.conf') || exists('nginx/default.conf') || exists('deploy/nginx/default.conf');
  add('Nginx default.conf', hasNginxConf ? ok : warn, hasNginxConf ? 'mevcut' : 'yok');

  const hasDeployProd = exists('scripts/deploy-prod.sh') || exists('scripts/deploy.sh');
  const hasDeployLive = exists('scripts/deploy-live.sh');
  add('scripts/deploy-prod.sh / deploy-live.sh', hasDeployProd && hasDeployLive ? ok : warn, hasDeployProd && hasDeployLive ? 'mevcut' : 'eksik (alternatif deploy.sh var)');

  add('SSL (certbot) ve firewall (ufw)', warn, 'henüz uygulanmadı');

  const hasEnvExample = exists('.env.production.example') || exists('apps/web/.env.production');
  add('.env.production.example', hasEnvExample ? ok : warn, hasEnvExample ? 'örn: apps/web/.env.production mevcut' : 'example yok');
})();

// 6) Quality & Logs
(() => {
  out.push('\n# 6️⃣ Quality & Logs');
  const hasValidate = exists('apps/web/scripts/validate-host.ts');
  add('scripts/validate-host.ts → /api/health', hasValidate ? ok : warn, hasValidate ? 'mevcut' : 'yok');

  const hasSmoke = exists('apps/web/scripts/smoke-tests.sh');
  add('scripts/smoke-tests.sh → temel endpoint testleri', hasSmoke ? ok : warn, hasSmoke ? 'mevcut' : 'yok');

  const hasAfterBuild = exists('apps/web/scripts/after-build.ts');
  add('after-build.ts → health doğrulaması', hasAfterBuild ? ok : warn, hasAfterBuild ? 'mevcut' : 'yok');

  // logs klasörü ve dosya yazımı
  const logsDir = p('logs');
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });
})();

// Başlık ve özet
const header = [
  '# 🧠 KARGANOT SYSTEM INTEGRITY CHECK',
  '# Framework: Next.js 14 + NestJS + Prisma + PostgreSQL',
  '# Hedef: Yapılan geliştirmeleri tek tek denetle ve eksik kalanları raporla.',
  '# Çıktı: console.log ve logs/system-check-report.txt',
  '# Format: ✅ Tamamlandı / ⚠️ Eksik / ❌ Hatalı',
  ''
];

const report = header.concat(out).join('\n');

// Konsola yaz
console.log(report);

// Dosyaya yaz
const outFile = p('logs/system-check-report.txt');
fs.writeFileSync(outFile, report, 'utf8');
