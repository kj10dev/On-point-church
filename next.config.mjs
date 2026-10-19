/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH
  ?? (process.env.GITHUB_PAGES === "true" ? "/On-point-church" : "");
const nextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
};

export default nextConfig;
