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