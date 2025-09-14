// ENDPOINT: /api/complaints
// Controller
import { NextResponse } from "next/server";
import { createComplaint, getAllComplaints, updateComplaint, addReviewedNotes } from "../services/complaintService";
import { UpdateComplaintInput } from "../services/types/types";
/* POST /api/complaints
* Creates a new complaint with associated customer.
* request: Request - The incoming request object containing complaint details.
* Returns: NextResponse - A JSON response with the created complaint or an error message.
*/
export async function POSTComplaint(request: Request) {
    try {
        const data = await request.json();
        const complaint = await createComplaint(data);
        return NextResponse.json(complaint, { status: 201 });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(errorMessage, { status: 500 });
    }
}

/* GET /api/complaints
* Creates a new complaint with associated customer.
* request: Request - The incoming request object containing complaint details.
* Returns: NextResponse - A JSON response with the created complaint or an error message.
*/
export async function GETComplaints() {
    try {
        const complaints = await getAllComplaints();
        return NextResponse.json(complaints, {status: 200});
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(errorMessage, { status: 500 });
    }
}

/* PATCH /api/complaints
* Update a complaint.
*/
export async function PATCHComplaint(request: Request, { params }: { params: { id: string } }) {
  try {
    const complaintId = Number(params.id);
    const data: UpdateComplaintInput = await request.json();

    if (!data.userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    // Llamamos al service con el complaintId y los campos opcionales
    const { complaintId: _, ...restData } = data;
    const complaint = await updateComplaint({ complaintId, ...restData });
    return NextResponse.json(complaint, { status: 200 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

