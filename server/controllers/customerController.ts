// ENDPOINT: /api/customer
// Controller
import { NextResponse } from "next/server";
import { createCustomer, getAllCustomers } from "../services/customerService";

/* POST /api/customer
* Creates a new customer
*
*/
export async function PostCostumer( request:Request) {
    try {
        const data = await request.json();
        const customer = await createCustomer(data);
        return NextResponse.json(customer, {status: 201});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(errorMessage, { status: 500 });
    }
}

/* GET /api/customer
* Get all customers
* return customers
*/
export async function GetCustomers() {
    try {
        const customer = await getAllCustomers();
        return NextResponse.json(customer, {status: 201});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(errorMessage, { status: 500 });
    }
}