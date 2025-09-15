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
    // Customers and complains
    // - Customers: upsert por email 
    // - Complaints:
    //   Status: "open" | "in_progress" | "closed"
    // ---------------------------------------------------------------------------------

    // 1) Customers
    const customers = [
        { fullname: "Juan Pérez",  email: "juan.perez@example.com" },
        { fullname: "María García", email: "maria.garcia@example.com" },
        { fullname: "Luis López",   email: "luis.lopez@example.com" },
    ];

    // Upsert de customers x email 
    for (const c of customers) {
        await prisma.customer.upsert({
            where: { email: c.email },
            update: {},
            create: c,
        });
    }
    console.log("Customers upserted");

    // 2) Complaints
    const complaintsPlan: Array<{
        customerEmail: string;
        items: Array<{ title: string; body: string; status?: "open" | "in_progress" | "closed" }>;
    }> = [
        {
            customerEmail: "juan.perez@example.com",
            items: [
                {
                    title: "Entrega retrasada",
                    body: "El pedido llegó más tarde de lo prometido.",
                    status: "open",
                },
                {
                    title: "Producto defectuoso",
                    body: "El dispositivo no enciende al sacarlo de la caja.",
                    status: "in_progress",
                },
            ],
        },
        {
            customerEmail: "maria.garcia@example.com",
            items: [
                {
                    title: "Cobro duplicado",
                    body: "Se realizó un cargo doble en su tarjeta.",
                    status: "closed",
                },
            ],
        },
        {
            customerEmail: "luis.lopez@example.com",
            items: [
                {
                    title: "Problemas con garantía",
                    body: "No queda claro el periodo de cobertura.",
                    status: "open",
                },
            ],
        },
    ];

    // 3) Create de complaints x cliente
    for (const plan of complaintsPlan) {
        // Search customer 
        const customer = await prisma.customer.findUnique({
            where: { email: plan.customerEmail },
            select: { customer_Id: true, email: true },
        });

        if (!customer) {
            console.warn(`Cliente no encontrado: ${plan.customerEmail}. Se omiten sus complaints.`);
            continue;
        }

        for (const item of plan.items) {
            const existing = await prisma.complaint.findFirst({
                where: {
                    title: item.title,
                    customerId: customer.customer_Id,
                },
                select: { complaint_Id: true },
            });

            if (existing) {
                continue;
            }

            // Create the complaint and associate it
            await prisma.complaint.create({
                data: {
                    title: item.title,
                    body: item.body,
                    status: item.status ?? "open",
                    customer: { connect: { email: plan.customerEmail } },
                },
            });
        }
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