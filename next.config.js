module.exports = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'panel',
  trailingSlash: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
  // images: { unoptimized: true },
}