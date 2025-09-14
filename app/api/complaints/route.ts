// ENDPOINT: /api/complaints
import { NextRequest } from "next/server";
import { POSTComplaint, GETComplaints } from "@/server/controllers/complaintController";

export const GET = GETComplaints; 

export const POST = async (req: NextRequest) => {
  return POSTComplaint(req); 
};
