/**
 * Complaints API Endpoints
 *
 * Provides authenticated CRUD operations for complaints:
 *
 * - POST /api/complaints → Creates a new complaint associated with a customer.
 *   Receives complaint details in the request body and returns the created complaint.
 *
 * - GET /api/complaints → Retrieves all complaints. Requires authentication.
 *   Returns a JSON array of complaints.
 *
 * - PATCH /api/complaints/:id → Updates a specific complaint by ID. Requires authentication.
 *   Receives partial complaint data in the request body and returns the updated complaint.
 *
 * Notes:
 * - All endpoints are wrapped with `withAuth` middleware to ensure only authenticated users can access.
 * - POST and PATCH return appropriate HTTP status codes: 201 for creation, 200 for successful retrieval or update.
 * - PATCH validates the complaint ID and merges user info for auditing.
 */

import { NextRequest, NextResponse } from "next/server";
import { createComplaint, getAllComplaints, updateComplaint } from "../services/complaintService";
import { UpdateComplaintInput } from "../services/types/types";
import { withAuth } from "../../lib/authHelpers";

/* POST /api/complaints
* Creates a new complaint with associated customer.
* request: Request - The incoming request object containing complaint details.
* Returns: NextResponse - A JSON response with the created complaint or an error message.
*/
export const POSTComplaint = (async (req: NextRequest) => {
  const data = await req.json();
  const complaint = await createComplaint(data);
  return NextResponse.json(complaint, { status: 201 });
});


/* GET /api/complaints
* Get all complaints - requires authentication
* request: NextRequest - The incoming request object
* Returns: NextResponse - A JSON response with all complaints or an error message.
*/
export const GETComplaints = withAuth(async (req: NextRequest, user) => {
  const complaints = await getAllComplaints();
  return NextResponse.json(complaints, {status: 200});
});

/* PATCH /api/complaints/:id - CON AUTENTICACIÓN */
export const PATCHComplaint = (params: { params: { id: string } }) => 
  withAuth(async (req: NextRequest, user) => {    
    const complaintId = Number(params.params.id);
    
    if (isNaN(complaintId)) {
      return NextResponse.json({ error: "Invalid complaint ID" }, { status: 400 });
    }

    const body = await req.json();
    
    const updateData: UpdateComplaintInput = {
      complaintId,
      userId: user.userId,
      ...body,
    };

    const updated = await updateComplaint(updateData);
    return NextResponse.json(updated, { status: 200 });
  });