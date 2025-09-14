import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* Function to authenticate an admin user and return a JWT token
* Environment Variables:
* - JWT_SECRET: The secret key used to sign the JWT token
* The token expires in 3 hours
* Throws an error if the user is not found or if the password is invalid
* Returns the JWT token if authentication is successful
*/
export async function loginAdmin(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "3h" }
    );
    return token;
}