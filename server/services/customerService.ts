/**
 * Customer Service
 *
 * Provides functions to manage customer data:
 * 
 * - createCustomer(data: CreateCustomerInput): Creates a new customer with fullname and email. Returns the created customer object.
 * - getCustomerByEmail(email: string): Searches for a customer by email. Returns the customer object or null if not found.
 * - getAllCustomers(): Retrieves all customers. Returns an array of customer objects.
 */
import prisma from "@/lib/prisma";
import { CreateCustomerInput } from "./types/types";

/* Service to create and retrieve customers
* Function to create a new customer.
* Data:
* - name: string
* - email: string
* returns the created customer object
*/
export async function createCustomer(data: CreateCustomerInput) {
  try {
    const customer = await prisma.customer.create({
      data: {
        fullname: data.fullname,
        email: data.email,
      },
    });
    return customer;
  } catch (error) {
    throw new Error("Error creating customer: " + (error as Error).message);
  }
}

/* Function to search customers by email.
* email: string - The email to search for.
* returns the customer object or null if not found
*/
export async function getCustomerByEmail(email: string) {
  return prisma.customer.findUnique({ where: { email } });
}

/* Function to retrieve all customers.
* returns an array of customer objects
*/
export async function getAllCustomers() {
    const customers = await prisma.customer.findMany();
    return customers;
}
