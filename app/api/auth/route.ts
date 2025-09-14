// ENDPOINT: /api/auth
import { NextResponse } from "next/server";
import { loginAdmin } from "../../../server/services/auth/authService";

/* POST /api/auth/login
* Logs in an admin user with provided credentials.
* request: Request - The incoming request object containing login details.
* Returns: NextResponse - A JSON response with a JWT token or an error message.
*/
export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const token = await loginAdmin(email, password);
        return NextResponse.json({ token }, { status: 200 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ error: errorMessage }, { status: 401 });
    }
}