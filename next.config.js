/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: false,

  env: {
    GOOGLE_ID: "461977374007-eg4ib2q88e27as40dliunp5cbj78imq9.apps.googleusercontent.com",

    GOOGLE_SECRET: "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",

    NEXTAUTH_URL: process.env.NODE_ENV === "production" ? "https://project-management-2-t43d-git-dat-angadgit.vercel.app/" : "http://localhost:3000/",
    BaseURL: process.env.NODE_ENV === "production" ? "https://project-management-2-t43d-git-dat-angadgit.vercel.app/" : "http://localhost:3000/",

    MONGO_URL: "mongodb+srv://angad:Angad1234@cluster0.5xl6h.mongodb.net/testDB?retryWrites=true&w=majority",
  }

}

module.exports = nextConfig
