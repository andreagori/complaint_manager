/**
 * Customer Types
 *
 * - Customer: Represents a customer in the system.
 *   - customer_Id: number → Unique customer ID
 *   - fullname: string → Customer's full name
 *   - email: string → Customer's email
 *   - created_at: string → Timestamp when the customer was created
 *
 * - CreateCustomerRequest: Data required to create a new customer.
 *   - fullname: string → Customer's full name
 *   - email: string → Customer's email
 */

export interface Customer {
  customer_Id: number;
  fullname: string;
  email: string;
  created_at: string;
}

export interface CreateCustomerRequest {
  fullname: string;
  email: string;
}