/**
 * Complaints API Endpoint: /api/complaints/[id]
 * 
 * This endpoint handles updates to a specific complaint identified by its `id`.
 * It provides a PATCH method to modify complaint data, such as status or content.
 * 
 * Server-side Handling:
 * - Receives a PATCH request targeting a specific complaint ID.
 * - Calls the `PATCHComplaint` controller function with:
 *    - `params`: an object containing the complaint ID (`params.id`).
 *    - `req`: the NextRequest object containing request body and headers.
 * - The controller handles all validation, database updates, and response formatting.
 * - Returns the result of the PATCH operation (updated complaint or error message).
 * 
 * Request:
 * PATCH /api/complaints/:id
 * Body (JSON):
 * {
 *   "status": "resolved",
 *   "response": "Your complaint has been addressed",
 *   ...
 * }
 * 
 * Response:
 * - Success (200):
 * {
 *   "id": "...",
 *   "status": "resolved",
 *   "response": "...",
 *   ...
 * }
 * - Error (e.g., 400/404):
 * {
 *   "error": "Complaint not found" 
 * }
 * 
 * Dependencies:
 * - NextRequest from "next/server" for handling the incoming request.
 * - PATCHComplaint from "@/server/controllers/complaintController" for business logic.
 */

import { NextRequest } from "next/server";
import { PATCHComplaint } from "@/server/controllers/complaintController";

export async function PATCH(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  // Forward the request and complaint ID to the controller
  return PATCHComplaint({ params })(req);
}