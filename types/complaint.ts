// types/complaint.ts

export interface ReviewedComplaint {
  reviewedComplaint_Id: number;
  complaintId: number;
  userId: number;
  dueDate: string; // ISO string
  notes?: string;
  createdAt: string;
}

export interface Complaint {
  complaint_Id: number;
  title: string;
  body: string;
  status: "open" | "in_progress" | "closed";
  created_at: string;
  customerId: number;
  reviewedComplaints?: ReviewedComplaint[];
}

export interface CreateComplaintInput {
  fullname: string;
  customerEmail: string;
  title: string;
  body: string;
}

export interface UpdateComplaintInput {
  complaintId: number;
  status?: "open" | "in_progress" | "closed";
  dueDate?: string; // ISO string
  notes?: string;
  userId: number; // staff que hace la actualización
}
