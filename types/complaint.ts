/**
 * Complaint and ReviewedComplaint Types
 *
 * - ReviewedComplaint: Represents a staff review of a complaint.
 *   - reviewedComplaint_Id: number → Unique ID of the review
 *   - complaintId: number → Associated complaint ID
 *   - userId: number → Staff user ID who reviewed
 *   - dueDate: string → Due date for follow-up (ISO string)
 *   - notes?: string → Optional notes by staff
 *   - createdAt: string → Timestamp of review creation
 *
 * - Complaint: Main complaint object.
 *   - complaint_Id: number → Unique complaint ID
 *   - title: string → Complaint title
 *   - body: string → Complaint description
 *   - status: "open" | "in_progress" | "closed" → Current status
 *   - created_at: string → Timestamp of complaint creation
 *   - customerId: number → ID of the customer who submitted it
 *   - reviewedComplaints?: ReviewedComplaint[] → Optional array of reviews
 *
 * - CreateComplaintInput: Data required to create a new complaint.
 *   - fullname: string → Customer's full name
 *   - customerEmail: string → Customer's email
 *   - title: string → Complaint title
 *   - body: string → Complaint description
 *
 * - UpdateComplaintInput: Data used to update a complaint.
 *   - complaintId: number → Complaint to update
 *   - status?: "open" | "in_progress" | "closed" → Optional new status
 *   - dueDate?: string → Optional new due date (ISO string)
 *   - notes?: string → Optional notes
 *   - userId: number → Staff user ID making the update
 */

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
