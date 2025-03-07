// opions for cookie
export const cookieOptions = {
  httpOnly: true,
  secure: true, // Use false for local development
  sameSite: "lax", // Allows cookies to work across subdomains
  maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
};

export const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/dovo2tdtv/image/upload/";
