// ENDPOINT: /api/customer
import { PostCostumer, GetCustomers } from "@/server/controllers/customerController";

export async function POST( request:Request) {
    return await PostCostumer(request);
}


export async function GET() {
    return await GetCustomers();
}