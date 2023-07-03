/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://martinas.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/config']
}
