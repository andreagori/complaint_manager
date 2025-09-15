/**
 * Types for Customer and Complaint operations
 *
 * - CreateCustomerInput: Input data required to create a new customer.
 *   - fullname: Customer's full name
 *   - email: Customer's email address
 *
 * - CreateComplaintInput: Input data required to create a new complaint.
 *   - fullname: Name of the customer submitting the complaint
 *   - customerEmail: Customer's email
 *   - title: Complaint title
 *   - body: Complaint message/content
 *
 * - UpdateComplaintInput: Input data to update an existing complaint.
 *   - complaintId: ID of the complaint to update
 *   - status?: Optional new status ('open', 'in_progress', 'closed')
 *   - dueDate?: Optional due date (ISO string)
 *   - notes?: Optional notes added by staff
 *   - userId: ID of the staff user performing the update
 */

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
  userId: number; // userId 
}
