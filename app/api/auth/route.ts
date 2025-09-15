/**
 * Auth API Endpoint: /api/auth
 * 
 * This endpoint handles admin user authentication.
 * It provides a POST method to log in an admin with email and password.
 * 
 * Server-side Handling:
 * - Receives a POST request containing email and password in JSON format.
 * - Calls the `loginAdmin` service, which validates credentials against the database.
 * - On successful login:
 *    - Returns the authenticated user object in JSON.
 *    - Sets an `auth_token` cookie containing the JWT token.
 *      - `httpOnly: false` (can be accessed by client-side scripts if needed)
 *      - `secure` is true in production
 *      - `maxAge` of 3 hours
 *      - `path` set to `/` and `sameSite: lax` for cookie security.
 * - On failure:
 *    - Returns a JSON response with an error message and HTTP status 401.
 * 
 * Request:
 * POST /api/auth/login
 * Body (JSON):
 * {
 *   "email": "admin@onexample.com",
 *   "password": "yourPassword"
 * }
 * 
 * Response:
 * - Success (200):
 * {
 *   "user": {
 *      "id": "...",
 *      "email": "...",
 *      ...
 *   }
 * }
 * - Error (401):
 * {
 *   "error": "Invalid credentials"
 * }
 * 
 * Dependencies:
 * - NextResponse from "next/server" for server response handling.
 * - loginAdmin service from "../../../server/services/auth/authService" for authentication logic.
 */
import { NextResponse } from "next/server";
import { loginAdmin } from "../../../server/services/auth/authService";

export async function POST(request: Request) {
    try {
        // Parse request body
        const { email, password } = await request.json();
        // Authenticate admin user
        const {token, user} = await loginAdmin(email, password);
        // Create JSON response with user info
        const response = NextResponse.json({ user });

        // Set authentication token as cookie
        response.cookies.set({
        name: "auth_token",
        value: token,
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 3, // 3 horas
        path: "/",
        sameSite: "lax",
        });
        return response;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
}