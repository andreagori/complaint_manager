// ENDPOINT: /api/complaints/[id]/route.ts
import { NextRequest } from "next/server";
import { PATCHComplaint } from "@/server/controllers/complaintController";

export async function PATCH(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  return PATCHComplaint({ params })(req);
}