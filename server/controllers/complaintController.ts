// ENDPOINT: /api/complaints
// Controller
import { NextRequest, NextResponse } from "next/server";
import { createComplaint, getAllComplaints, updateComplaint } from "../services/complaintService";
import { UpdateComplaintInput } from "../services/types/types";
import { withAuth } from "../../lib/authHelpers";

/* POST /api/complaints
* Creates a new complaint with associated customer.
* request: Request - The incoming request object containing complaint details.
* Returns: NextResponse - A JSON response with the created complaint or an error message.
*/
export const POSTComplaint = withAuth(async (req: NextRequest, user) => {
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