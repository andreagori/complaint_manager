// ENDPOINT: /api/complaints/[id]/route.ts
import { PATCHComplaint } from "@/server/controllers/complaintController";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  return await PATCHComplaint(request, {params});
}
