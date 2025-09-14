export interface CreateCustomerInput {
  fullname: string;
  email: string;
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
  userId: number; // userId del staff que está haciendo el review
}
