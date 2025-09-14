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

export interface Complaint {
  complaint_Id: number;
  title: string;
  body: string;
  status: "open" | "in_progress" | "closed";
  created_at: string;
  customerId: number;
}
