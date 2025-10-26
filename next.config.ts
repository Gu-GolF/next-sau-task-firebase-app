import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[

      {
        protocol: 'https',
        hostname:"upaaclchgcsnkwuueclw.supabase.co",
        port: '',
        pathname: '/storage/v1/object/public/**',
        search: '',
      }
    ],
  },
};

export default nextConfig;
