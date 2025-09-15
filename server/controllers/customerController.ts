/**
 * Customers API Endpoints
 *
 * Provides operations for managing customers:
 *
 * - POST /api/customer → Creates a new customer.
 *   Receives customer details in the request body and returns the created customer.
 *   Returns status 201 on success, 500 on server error.
 *
 * - GET /api/customer → Retrieves all customers. Requires authentication.
 *   Returns a JSON array of customers with status 200.
 *
 * Notes:
 * - GET endpoint is wrapped with `withAuth` middleware to ensure only authenticated users can access.
 * - POST endpoint currently does not require authentication but handles errors gracefully.
 */

import { NextResponse, NextRequest } from "next/server";
import { createCustomer, getAllCustomers } from "../services/customerService";
import { withAuth } from "@/lib/authHelpers";

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
export const GetCustomers = withAuth( async (req: NextRequest, user) => {
    const customers = await getAllCustomers();
    return NextResponse.json(customers, {status: 200});
})