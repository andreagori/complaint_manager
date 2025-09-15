/**
 * Customer API Endpoint: /api/customer
 * 
 * This endpoint handles creating new customers and retrieving all customers.
 * It provides POST and GET methods for client interactions.
 * 
 * Server-side Handling:
 * - POST:
 *    - Receives a POST request with customer details in JSON format.
 *    - Calls `PostCostumer` controller to validate and save the customer to the database.
 *    - Returns the newly created customer or an error if validation fails.
 * - GET:
 *    - Uses `GetCustomers` controller to fetch all customers from the database.
 *    - May include filtering, sorting, or pagination logic inside the controller.
 * 
 * Request Examples:
 * - GET /api/customer
 *   - Retrieves a list of all customers.
 * 
 * - POST /api/customer
 *   Body (JSON):
 *   {
 *     "fullname": "John Doe",
 *     "email": "john@onexample.com",
 *     ...
 *   }
 * 
 * Response Examples:
 * - GET Success (200):
 * [
 *   {
 *     "customer_id": "...",
 *     "fullname": "...",
 *     "email": "...",
 *     ...
 *   },
 *   ...
 * ]
 * - POST Success (201):
 * {
 *   "customer_id": "...",
 *   "fullname": "...",
 *   "email": "...",
 *   ...
 * }
 * - Error (400/500):
 * {
 *   "error": "Error message describing what went wrong"
 * }
 * 
 * Dependencies:
 * - PostCostumer, GetCustomers from "@/server/controllers/customerController" for business logic.
 */

import { PostCostumer, GetCustomers } from "@/server/controllers/customerController";

export async function POST( request:Request) {
    return await PostCostumer(request);
}


export const GET = GetCustomers;