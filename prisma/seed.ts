import prisma from "@/lib/prisma";
import bcrypt from "bcrypt"

/* Function to seed the database with an admin user if one does not exist
* The admin user's email and password are taken from environment variables
* Environment Variables:
* - ADMIN_EMAIL: The email for the admin user
* - ADMIN_PASSWORD: The password for the admin user
* Make sure to set the environment variables before running the seed script
*/
async function main() {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
    const adminExists = await prisma.user.findUnique
    ({
        where: {email: process.env.ADMIN_EMAIL!}
    });

    if (!adminExists) {
        await prisma.user.create({
            data: {
                name: "Admin",
                email: process.env.ADMIN_EMAIL!,
                password: password,
            },
        });
        console.log("Admin user created");
    } else {
        console.log("Admin user already exists");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });