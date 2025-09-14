// ENDPOINT: /api/complaints
import { POSTComplaint, GETComplaints} from "@/server/controllers/complaintController";

export async function POST(request: Request) {
    return await POSTComplaint(request);
}

export async function GET() {
    return await GETComplaints();
}
