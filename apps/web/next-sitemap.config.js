/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://karganot.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  generateIndexSitemap: true,
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/about'),
      await config.transform(config, '/pricing'),
      await config.transform(config, '/faq'),
      await config.transform(config, '/privacy'),
      await config.transform(config, '/terms'),
    ];
  },
};
