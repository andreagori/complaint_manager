import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { AuthenticatedUser, JwtPayload } from '../types/auth';

export function verifyToken(token: string): AuthenticatedUser {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export function getTokenFromRequest(request: NextRequest): string {
  // Buscar token en cookies
  const cookieToken = request.cookies.get('auth_token')?.value;
  if (cookieToken) {
    return cookieToken;
  }

  // Buscar token en header Authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  throw new Error('No authentication token found');
}

export function authenticateRequest(request: NextRequest): AuthenticatedUser {
  const token = getTokenFromRequest(request);
  return verifyToken(token);
}

export function withAuth(handler: (req: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const user = authenticateRequest(req);
      return await handler(req, user);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: 'Unauthorized: ' + errorMessage }, { status: 401 });
    }
  }
}
