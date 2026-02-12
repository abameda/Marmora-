// Auth utility functions
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // Placeholder
  return false;
}

export async function createJWT(payload: Record<string, unknown>): Promise<string> {
  // Placeholder
  return '';
}

export async function verifyJWT(token: string): Promise<Record<string, unknown> | null> {
  // Placeholder
  return null;
}
