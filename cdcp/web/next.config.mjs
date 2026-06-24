/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We handle locale routing manually via the [locale] segment (the App-Router i18n pattern),
  // so the root layout lives at app/[locale]/layout.tsx. Redirect the bare root to the default locale.
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      { source: "/guides", destination: "/en/guides", permanent: false },
      { source: "/privacy", destination: "/en/privacy", permanent: false },
    ];
  },
};

export default nextConfig;
