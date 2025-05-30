/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'lh3.googleusercontent.com'], // Add domains for external images
  },
  // Add experimental features and build configuration
  experimental: {
    missingSuspenseWithCSRError: false,
  },
  // Disable static page generation for dynamic routes
  staticPageGenerationTimeout: 0,
};

module.exports = nextConfig; 