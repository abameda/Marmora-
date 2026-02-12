import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-key-change-in-production'
);

/**
 * Verify password against bcrypt hash
 * @param password - Plain text password
 * @param hash - Bcrypt hash from environment variable
 * @returns True if password matches hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a JWT session token with 7-day expiry
 * @param payload - Payload data to include in JWT
 * @returns Signed JWT string
 */
export async function createJWT(payload: Record<string, unknown>): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
  
  return jwt;
}

/**
 * Verify and decode JWT session token
 * @param token - JWT string from session cookie
 * @returns Decoded payload if valid, null if invalid or expired
 */
export async function verifyJWT(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as Record<string, unknown>;
  } catch (error) {
    // Invalid or expired token
    return null;
  }
}
