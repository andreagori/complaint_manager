/**
 * Complaints API Endpoint: /api/complaints
 * 
 * This endpoint handles creating new complaints and retrieving all complaints.
 * It provides GET and POST methods for client interactions.
 * 
 * Server-side Handling:
 * - GET:
 *    - Uses `GETComplaints` controller to fetch all complaints from the database.
 *    - May include filtering, sorting, or pagination logic inside the controller.
 * - POST:
 *    - Receives a POST request with complaint details in JSON format.
 *    - Uses `POSTComplaint` controller to validate, save, and process the complaint.
 *    - Returns the created complaint or an error if validation fails.
 * 
 * Request Examples:
 * - GET /api/complaints
 *   - Retrieves a list of all complaints.
 * 
 * - POST /api/complaints
 *   Body (JSON):
 *   {
 *     "userEmail": "example@onexample.com",
 *     "subject": "Issue subject",
 *     "description": "Detailed description of the complaint",
 *     ...
 *   }
 * 
 * Response Examples:
 * - GET Success (200):
 * [
 *   {
 *     "id": "...",
 *     "userEmail": "...",
 *     "subject": "...",
 *     "description": "...",
 *     "status": "pending",
 *     ...
 *   },
 *   ...
 * ]
 * - POST Success (201):
 * {
 *   "id": "...",
 *   "userEmail": "...",
 *   "subject": "...",
 *   "description": "...",
 *   "status": "pending",
 *   ...
 * }
 * - Error (400/500):
 * {
 *   "error": "Error message describing what went wrong"
 * }
 * 
 * Dependencies:
 * - NextRequest from "next/server" for incoming request handling.
 * - POSTComplaint, GETComplaints from "@/server/controllers/complaintController" for business logic.
 */

import { NextRequest } from "next/server";
import { POSTComplaint, GETComplaints } from "@/server/controllers/complaintController";

export const GET = GETComplaints; 

export const POST = async (req: NextRequest) => {
  return POSTComplaint(req); 
};
